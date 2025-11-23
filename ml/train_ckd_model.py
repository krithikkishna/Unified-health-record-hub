
import pandas as pd
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, roc_auc_score
import joblib

DATA_PATH = Path(__file__).resolve().parent / "data" / "ckd_dataset.csv"
MODEL_DIR = Path(__file__).resolve().parent / "models"
MODEL_DIR.mkdir(parents=True, exist_ok=True)

FEATURES = [
    "age",
    "blood_pressure",
    "specific_gravity",
    "blood_glucose_random",
    "sodium",
    "hemoglobin",
    "red_blood_cell_count",
]

TARGET = "ckd_label"  # 0 or 1


def main():
    df = pd.read_csv(DATA_PATH)

    X = df[FEATURES]
    y = df[TARGET]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    clf = RandomForestClassifier(
        n_estimators=200,
        max_depth=None,
        random_state=42,
        n_jobs=-1,
    )

    clf.fit(X_train_scaled, y_train)

    y_pred = clf.predict(X_test_scaled)
    y_proba = clf.predict_proba(X_test_scaled)[:, 1]

    acc = accuracy_score(y_test, y_pred)
    auc = roc_auc_score(y_test, y_proba)

    print(f"Accuracy: {acc:.4f}")
    print(f"AUC-ROC: {auc:.4f}")

    joblib.dump(clf, MODEL_DIR / "ckd_model.pkl")
    joblib.dump(scaler, MODEL_DIR / "scaler.pkl")
    print(f"Saved model and scaler to {MODEL_DIR}")


if __name__ == "__main__":
    main()
