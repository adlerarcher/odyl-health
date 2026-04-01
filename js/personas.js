/* ODYL synthetic personas — client-side demo data only, no PHI */
window.ODYL_PERSONAS = [
  {
    Patient_ID: 1, User_ID: "OP56972Z", First_Name: "Avery", Last_Name: "White",
    Gender: "Male", Race_Ethnicity: "White", DOB: "2002-04-21",
    tests: [
      { type: "Hepatitis B", result: "Positive", date: "2025-11-04", location: "IWantTheKit" }
    ],
    survey: { Q1: 0, Q2: 1, Q3: 1, Q4: 1, Q5: 1, Q6: 3, Q7: 2, Q8: 1 },
    rewards: 50, bg: 2
  },
  {
    Patient_ID: 2, User_ID: "OP27346Q", First_Name: "Harper", Last_Name: "Young",
    Gender: "Female", Race_Ethnicity: "White", DOB: "2006-05-22",
    tests: [
      { type: "Chlamydia", result: "Negative", date: "2026-01-15", location: "Johns Hopkins Holy Cross Hospital" },
      { type: "HSV-1", result: "Positive", date: "2024-04-28", location: "Chase Brexton" },
      { type: "Trichomoniasis", result: "Indeterminate", date: "2025-01-15", location: "Johns Hopkins Holy Cross Hospital" },
      { type: "Syphilis", result: "Positive", date: "2024-07-13", location: "Baltimore City Health Department" },
      { type: "Gonorrhea", result: "Negative", date: "2026-01-31", location: "IWantTheKit" },
      { type: "HSV-2", result: "Negative", date: "2025-05-20", location: "LabCorp" },
      { type: "HPV", result: "Negative", date: "2025-05-17", location: "IWantTheKit" }
    ],
    survey: { Q1: 1, Q2: 1, Q3: 3, Q4: 3, Q5: 2, Q6: 2, Q7: 2, Q8: 1 },
    rewards: 120, bg: 1
  },
  {
    Patient_ID: 3, User_ID: "OP91579T", First_Name: "Hayden", Last_Name: "Lewis",
    Gender: "Male", Race_Ethnicity: "Black", DOB: "2011-01-18",
    tests: [
      { type: "HPV", result: "Indeterminate", date: "2024-05-12", location: "Chase Brexton" },
      { type: "Chlamydia", result: "Positive", date: "2024-09-05", location: "Johns Hopkins Holy Cross Hospital" },
      { type: "HIV", result: "Indeterminate", date: "2025-10-29", location: "IWantTheKit" },
      { type: "Trichomoniasis", result: "Negative", date: "2024-12-30", location: "Chase Brexton" },
      { type: "Hepatitis C", result: "Indeterminate", date: "2025-07-17", location: "Johns Hopkins Holy Cross Hospital" }
    ],
    survey: { Q1: 1, Q2: 1, Q3: 2, Q4: 1, Q5: 1, Q6: 2, Q7: 2, Q8: 2 },
    rewards: 85, bg: 3
  },
  {
    Patient_ID: 4, User_ID: "OP93175B", First_Name: "Jamie", Last_Name: "Rivera",
    Gender: "Male", Race_Ethnicity: "White", DOB: "2000-06-18",
    tests: [
      { type: "HPV", result: "Negative", date: "2025-04-26", location: "Johns Hopkins Holy Cross Hospital" },
      { type: "Trichomoniasis", result: "Positive", date: "2026-01-03", location: "LabCorp" },
      { type: "Gonorrhea", result: "Negative", date: "2025-04-25", location: "Chase Brexton" },
      { type: "Hepatitis B", result: "Positive", date: "2026-01-18", location: "LabCorp" },
      { type: "Syphilis", result: "Indeterminate", date: "2024-11-03", location: "LabCorp" }
    ],
    survey: { Q1: 1, Q2: 1, Q3: 2, Q4: 3, Q5: 3, Q6: 1, Q7: 2, Q8: 1 },
    rewards: 200, bg: 4
  },
  {
    Patient_ID: 5, User_ID: "OP44821K", First_Name: "Morgan", Last_Name: "Chen",
    Gender: "Female", Race_Ethnicity: "Asian", DOB: "2003-09-14",
    tests: [
      { type: "Chlamydia", result: "Negative", date: "2025-12-01", location: "Chase Brexton" },
      { type: "Gonorrhea", result: "Negative", date: "2025-12-01", location: "Chase Brexton" }
    ],
    survey: { Q1: 1, Q2: 2, Q3: 4, Q4: 2, Q5: 3, Q6: 2, Q7: 2, Q8: 2 },
    rewards: 30, bg: 5
  },
  {
    Patient_ID: 6, User_ID: "OP66290M", First_Name: "Jordan", Last_Name: "Davis",
    Gender: "Non-binary", Race_Ethnicity: "Black", DOB: "2001-11-30",
    tests: [],
    survey: { Q1: 0, Q2: 3, Q3: 4, Q4: 2, Q5: 3, Q6: 2, Q7: 2, Q8: 3 },
    rewards: 10, bg: 6
  }
];
