---
name: 🚨 Bug Report (Clinical Impact)
about: Report issues that may affect patient care, data integrity, or system security
labels: 'triage, healthcare'
title: '[SEVERITY] Brief Description (e.g., "Medication Display Error in Patient View")'
assignees: ''

---

<!-- 
  UHRH BUG REPORT TEMPLATE
  For issues that may impact clinical decision-making or patient data integrity
-->

## **1. Clinical Impact Assessment**
**Potential Impact Level** (Select one):
- [ ] Critical (Direct patient safety risk)
- [ ] High (Data corruption/loss)
- [ ] Medium (Workflow disruption)
- [ ] Low (Cosmetic/Non-critical)

**Affected Clinical Domain**:
- [ ] Medication Management
- [ ] Lab Results
- [ ] Patient Demographics
- [ ] Predictive Analytics
- [ ] FHIR Data Exchange
- [ ] Access Control

## **2. System Context**
- **Component**: `[e.g., Patient Dashboard, FHIR API, Predictive Engine]`
- **Version**: `[from package.json or git tag]`
- **Environment**: 
  - [ ] Production (Report to Clinical Safety Officer)
  - [ ] Staging
  - [ ] Development

## **3. Reproduction Steps**
```plaintext
1. Log in as [role] with [permissions]
2. Navigate to [specific EHR view]
3. Perform [action] with [test patient data]
4. Observe [incorrect behavior]