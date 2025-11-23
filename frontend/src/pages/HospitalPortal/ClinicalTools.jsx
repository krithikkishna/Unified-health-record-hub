import React from "react";
import styles from "@/styles/ClinicalTools.module.scss";
import CKDAlert from "@/components/alerts/CKDAlert";
import DiabetesRisk from "@/components/alerts/DiabetesRisk";
import CKDRiskRadar from "@/components/charts/CKDRiskRadar";
import DiabetesTrendChart from "@/components/charts/DiabetesTrendChart";
import { Card, CardContent } from "@/components/ui/card";

const ClinicalTools = () => {
  return (
    <div className={styles.clinicalTools}>
      <h1>Clinical Decision Support</h1>

      <div className={styles.alerts}>
        <Card>
          <CardContent>
            <h2>CKD Risk Alert</h2>
            <CKDAlert />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2>Diabetes Risk Alert</h2>
            <DiabetesRisk />
          </CardContent>
        </Card>
      </div>

      <div className={styles.charts}>
        <Card>
          <CardContent>
            <h2>CKD Risk Radar</h2>
            <CKDRiskRadar />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2>Diabetes Trend</h2>
            <DiabetesTrendChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClinicalTools;
