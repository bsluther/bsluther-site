import { v4 as uuid } from 'uuid'
import { Matrix, Steps } from './core'

export const blankStore = {
  goal: {
    id: uuid(),
    title: '',
    description: '',
    alternatives: {},
    alternativesOrder: [],
    criteria: {},
    criteriaOrder: [],
  },
  comparisons: {
    id: uuid(),
    criteria: [] as Matrix,
    alternatives: {} as Record<string, Matrix>,
  },
  step: Steps.Goal
}

export const nytStore = {
  "goal": {
      "id": "7f93e71e-4f92-428d-86c3-17b384d36a97",
      "title": "Choose an ID format.",
      "description": "Taken from the NYT blog example.",
      "alternatives": {
          "31e4bd62-7881-4323-89fd-11995ad654ba": {
              "id": "31e4bd62-7881-4323-89fd-11995ad654ba",
              "title": "UUID",
              "description": ""
          },
          "8c353645-c630-4b14-950a-d3e9a016d59f": {
              "id": "8c353645-c630-4b14-950a-d3e9a016d59f",
              "title": "Snowflake",
              "description": ""
          },
          "75e97dd4-5471-475a-819b-0065db70558d": {
              "id": "75e97dd4-5471-475a-819b-0065db70558d",
              "title": "NanoID",
              "description": ""
          },
          "662b0710-be59-4da4-b147-546c06f9c5bb": {
              "id": "662b0710-be59-4da4-b147-546c06f9c5bb",
              "title": "XID",
              "description": ""
          }
      },
      "alternativesOrder": [
          "31e4bd62-7881-4323-89fd-11995ad654ba",
          "8c353645-c630-4b14-950a-d3e9a016d59f",
          "75e97dd4-5471-475a-819b-0065db70558d",
          "662b0710-be59-4da4-b147-546c06f9c5bb"
      ],
      "criteria": {
          "37f13059-dd62-4929-a8ca-437d128ab84f": {
              "id": "37f13059-dd62-4929-a8ca-437d128ab84f",
              "title": "Developer Experience",
              "description": ""
          },
          "a145378e-02ff-4f84-a24a-9d11c700b491": {
              "id": "a145378e-02ff-4f84-a24a-9d11c700b491",
              "title": "Dist. Uniqueness",
              "description": ""
          },
          "16fc2f45-058d-41b7-964a-ccf46cc92af1": {
              "id": "16fc2f45-058d-41b7-964a-ccf46cc92af1",
              "title": "Ordering",
              "description": ""
          },
          "b11d4384-53ef-4f48-bcc0-6a589ea445e6": {
              "id": "b11d4384-53ef-4f48-bcc0-6a589ea445e6",
              "title": "Database Support",
              "description": ""
          },
          "31deb98f-1b34-4529-b623-d9379388b949": {
              "id": "31deb98f-1b34-4529-b623-d9379388b949",
              "title": "Randomness",
              "description": ""
          }
      },
      "criteriaOrder": [
          "37f13059-dd62-4929-a8ca-437d128ab84f",
          "a145378e-02ff-4f84-a24a-9d11c700b491",
          "16fc2f45-058d-41b7-964a-ccf46cc92af1",
          "b11d4384-53ef-4f48-bcc0-6a589ea445e6",
          "31deb98f-1b34-4529-b623-d9379388b949"
      ]
  },
  "comparisons": {
      "id": "8a9dd477-8da4-4baf-910b-a669f77ffee7",
      "criteria": [
          [
              0,
              -6,
              4,
              2,
              2
          ],
          [
              6,
              0,
              6,
              4,
              5
          ],
          [
              -4,
              -6,
              0,
              -1,
              0
          ],
          [
              -2,
              -4,
              1,
              0,
              -1
          ],
          [
              -2,
              -5,
              0,
              1,
              0
          ]
      ],
      "alternatives": {
          "37f13059-dd62-4929-a8ca-437d128ab84f": [
              [
                  0,
                  -1,
                  4,
                  2
              ],
              [
                  1,
                  0,
                  1,
                  0
              ],
              [
                  -4,
                  -1,
                  0,
                  1
              ],
              [
                  -2,
                  0,
                  -1,
                  0
              ]
          ],
          "a145378e-02ff-4f84-a24a-9d11c700b491": [
              [
                  0,
                  2,
                  1,
                  2
              ],
              [
                  -2,
                  0,
                  -2,
                  -1
              ],
              [
                  -1,
                  2,
                  0,
                  2
              ],
              [
                  -2,
                  1,
                  -2,
                  0
              ]
          ],
          "16fc2f45-058d-41b7-964a-ccf46cc92af1": [
              [
                  0,
                  -3,
                  0,
                  -2
              ],
              [
                  3,
                  0,
                  3,
                  1
              ],
              [
                  0,
                  -3,
                  0,
                  -3
              ],
              [
                  2,
                  -1,
                  3,
                  0
              ]
          ],
          "b11d4384-53ef-4f48-bcc0-6a589ea445e6": [
              [
                  0,
                  0,
                  2,
                  1
              ],
              [
                  0,
                  0,
                  3,
                  3
              ],
              [
                  -2,
                  -3,
                  0,
                  -1
              ],
              [
                  -1,
                  -3,
                  1,
                  0
              ]
          ],
          "31deb98f-1b34-4529-b623-d9379388b949": [
              [
                  0,
                  1,
                  1,
                  1
              ],
              [
                  -1,
                  0,
                  -1,
                  0
              ],
              [
                  -1,
                  1,
                  0,
                  1
              ],
              [
                  -1,
                  0,
                  -1,
                  0
              ]
          ]
      }
  },
  "step": 6
}

export const secondNytStore = {
  "goal": {
      "id": "67f1f97b-f6cb-4ee6-92d3-02a6523d8671",
      "title": "nyt",
      "description": "",
      "alternatives": {
          "3a9eb740-ad14-4b7c-b029-eeb1fe909cd2": {
              "id": "3a9eb740-ad14-4b7c-b029-eeb1fe909cd2",
              "title": "uuid",
              "description": ""
          },
          "5f72646d-d3ac-44fd-a6ff-694a6233bcb4": {
              "id": "5f72646d-d3ac-44fd-a6ff-694a6233bcb4",
              "title": "snowflake",
              "description": ""
          },
          "c199c556-92e0-4962-b436-0eace79a8e5e": {
              "id": "c199c556-92e0-4962-b436-0eace79a8e5e",
              "title": "nanoid",
              "description": ""
          },
          "ea895823-9893-4e39-8861-9ad1bccac028": {
              "id": "ea895823-9893-4e39-8861-9ad1bccac028",
              "title": "xid",
              "description": ""
          }
      },
      "alternativesOrder": [
          "3a9eb740-ad14-4b7c-b029-eeb1fe909cd2",
          "5f72646d-d3ac-44fd-a6ff-694a6233bcb4",
          "c199c556-92e0-4962-b436-0eace79a8e5e",
          "ea895823-9893-4e39-8861-9ad1bccac028"
      ],
      "criteria": {
          "b8cfe5fd-f1da-49b7-9c17-5eb853ad1632": {
              "id": "b8cfe5fd-f1da-49b7-9c17-5eb853ad1632",
              "title": "db support",
              "description": ""
          },
          "1618b181-a268-4ad2-a4e4-357416f726a3": {
              "id": "1618b181-a268-4ad2-a4e4-357416f726a3",
              "title": "dev UX",
              "description": ""
          },
          "34a53bfa-54df-476b-85aa-cbbc47c2fd5a": {
              "id": "34a53bfa-54df-476b-85aa-cbbc47c2fd5a",
              "title": "uniqueness",
              "description": ""
          },
          "fb7738e0-5933-4019-92e9-5c7c9b8bd72f": {
              "id": "fb7738e0-5933-4019-92e9-5c7c9b8bd72f",
              "title": "ordering",
              "description": ""
          },
          "73f3fc2a-8823-4d9a-acbe-1e2ba1937b0b": {
              "id": "73f3fc2a-8823-4d9a-acbe-1e2ba1937b0b",
              "title": "randomness",
              "description": ""
          }
      },
      "criteriaOrder": [
          "b8cfe5fd-f1da-49b7-9c17-5eb853ad1632",
          "1618b181-a268-4ad2-a4e4-357416f726a3",
          "34a53bfa-54df-476b-85aa-cbbc47c2fd5a",
          "fb7738e0-5933-4019-92e9-5c7c9b8bd72f",
          "73f3fc2a-8823-4d9a-acbe-1e2ba1937b0b"
      ]
  },
  "comparisons": {
      "id": "df68339a-348d-4f36-9d39-4bb6a55c9800",
      "criteria": [
          [
              0,
              -2,
              -4,
              -1,
              -1
          ],
          [
              2,
              0,
              -6,
              4,
              2
          ],
          [
              4,
              6,
              0,
              6,
              5
          ],
          [
              1,
              -4,
              -6,
              0,
              0
          ],
          [
              1,
              -2,
              -5,
              0,
              0
          ]
      ],
      "alternatives": {
          "b8cfe5fd-f1da-49b7-9c17-5eb853ad1632": [
              [
                  0,
                  0,
                  2,
                  1
              ],
              [
                  0,
                  0,
                  3,
                  3
              ],
              [
                  -2,
                  -3,
                  0,
                  -1
              ],
              [
                  -1,
                  -3,
                  1,
                  0
              ]
          ],
          "1618b181-a268-4ad2-a4e4-357416f726a3": [
              [
                  0,
                  1,
                  4,
                  2
              ],
              [
                  -1,
                  0,
                  1,
                  0
              ],
              [
                  -4,
                  -1,
                  0,
                  1
              ],
              [
                  -2,
                  0,
                  -1,
                  0
              ]
          ],
          "34a53bfa-54df-476b-85aa-cbbc47c2fd5a": [
              [
                  0,
                  2,
                  1,
                  2
              ],
              [
                  -2,
                  0,
                  -2,
                  -1
              ],
              [
                  -1,
                  2,
                  0,
                  2
              ],
              [
                  -2,
                  1,
                  -2,
                  0
              ]
          ],
          "fb7738e0-5933-4019-92e9-5c7c9b8bd72f": [
              [
                  0,
                  -3,
                  0,
                  -2
              ],
              [
                  3,
                  0,
                  3,
                  1
              ],
              [
                  0,
                  -3,
                  0,
                  -3
              ],
              [
                  2,
                  -1,
                  3,
                  0
              ]
          ],
          "73f3fc2a-8823-4d9a-acbe-1e2ba1937b0b": [
              [
                  0,
                  1,
                  1,
                  1
              ],
              [
                  -1,
                  0,
                  -1,
                  0
              ],
              [
                  -1,
                  1,
                  0,
                  1
              ],
              [
                  -1,
                  0,
                  -1,
                  0
              ]
          ]
      }
  },
  "step": 5
}

export const catNameStore = {
  "goal": {
      "id": "2c25e5f0-9b3a-4010-a792-1f80e9b9c713",
      "title": "Choose a cat name",
      "description": "",
      "alternatives": {
          "d2068278-04d6-4e97-801d-6cc9415fc5ac": {
              "id": "d2068278-04d6-4e97-801d-6cc9415fc5ac",
              "title": "Felix",
              "description": ""
          },
          "cd6d6c14-b04b-4ff7-ba9e-ad0ffb367401": {
              "id": "cd6d6c14-b04b-4ff7-ba9e-ad0ffb367401",
              "title": "Holiday Cortez",
              "description": ""
          },
          "a42d81a6-b9f4-4787-8662-1427c8a2cba3": {
              "id": "a42d81a6-b9f4-4787-8662-1427c8a2cba3",
              "title": "Larry",
              "description": ""
          }
      },
      "alternativesOrder": [
          "d2068278-04d6-4e97-801d-6cc9415fc5ac",
          "cd6d6c14-b04b-4ff7-ba9e-ad0ffb367401",
          "a42d81a6-b9f4-4787-8662-1427c8a2cba3"
      ],
      "criteria": {
          "6dec91f0-f832-4b9f-a1e5-0bfb238a4be8": {
              "id": "6dec91f0-f832-4b9f-a1e5-0bfb238a4be8",
              "title": "Uniqueness",
              "description": ""
          },
          "1d91c07c-6550-4d3f-a0c0-2a3bff06d796": {
              "id": "1d91c07c-6550-4d3f-a0c0-2a3bff06d796",
              "title": "Descriptiveness",
              "description": ""
          },
          "e58bb4c2-8184-444e-882e-3881681f78a9": {
              "id": "e58bb4c2-8184-444e-882e-3881681f78a9",
              "title": "Humourness",
              "description": ""
          }
      },
      "criteriaOrder": [
          "6dec91f0-f832-4b9f-a1e5-0bfb238a4be8",
          "1d91c07c-6550-4d3f-a0c0-2a3bff06d796",
          "e58bb4c2-8184-444e-882e-3881681f78a9"
      ]
  },
  "comparisons": {
      "id": "9dfe1be1-4bb6-42ee-b3a8-921799a07d8c",
      "criteria": [
          [
              0,
              3,
              2
          ],
          [
              -3,
              0,
              -2
          ],
          [
              -2,
              2,
              0
          ]
      ],
      "alternatives": {
          "6dec91f0-f832-4b9f-a1e5-0bfb238a4be8": [
              [
                  0,
                  8,
                  1
              ],
              [
                  -8,
                  0,
                  -2
              ],
              [
                  -1,
                  2,
                  0
              ]
          ],
          "1d91c07c-6550-4d3f-a0c0-2a3bff06d796": [
              [
                  0,
                  0,
                  5
              ],
              [
                  0,
                  0,
                  1
              ],
              [
                  -5,
                  -1,
                  0
              ]
          ],
          "e58bb4c2-8184-444e-882e-3881681f78a9": [
              [
                  0,
                  5,
                  7
              ],
              [
                  -5,
                  0,
                  -2
              ],
              [
                  -7,
                  2,
                  0
              ]
          ]
      }
  },
  "step": 6
}

export const workStore = {
  "goal": {
      "id": "a4d3be4f-8d09-4ee3-8056-ebd4b344cedf",
      "title": "Choose a job",
      "description": "",
      "alternatives": {
          "5118e97c-16d7-4605-9867-71fcdb188bec": {
              "id": "5118e97c-16d7-4605-9867-71fcdb188bec",
              "title": "Diego",
              "description": ""
          },
          "ad38c7c3-885c-41b5-ad65-3b469c1d6814": {
              "id": "ad38c7c3-885c-41b5-ad65-3b469c1d6814",
              "title": "Guam",
              "description": ""
          },
          "8834f67c-a6d8-4eab-bfc9-226743434778": {
              "id": "8834f67c-a6d8-4eab-bfc9-226743434778",
              "title": "Croughton",
              "description": ""
          }
      },
      "alternativesOrder": [
          "5118e97c-16d7-4605-9867-71fcdb188bec",
          "ad38c7c3-885c-41b5-ad65-3b469c1d6814",
          "8834f67c-a6d8-4eab-bfc9-226743434778"
      ],
      "criteria": {
          "a016d7cc-70a7-4b52-85f1-01554faff042": {
              "id": "a016d7cc-70a7-4b52-85f1-01554faff042",
              "title": "Income",
              "description": ""
          },
          "64ecd3f7-3c60-4483-a525-4520e5865a8c": {
              "id": "64ecd3f7-3c60-4483-a525-4520e5865a8c",
              "title": "Time away",
              "description": ""
          },
          "98d46034-f94d-43ab-8c6a-f0bfead571a7": {
              "id": "98d46034-f94d-43ab-8c6a-f0bfead571a7",
              "title": "School",
              "description": ""
          },
          "ab8be201-a451-4a75-9748-ba81010e05fe": {
              "id": "ab8be201-a451-4a75-9748-ba81010e05fe",
              "title": "Job location",
              "description": ""
          },
          "291b2b94-4e9c-4c20-96e1-845ef493a8a8": {
              "id": "291b2b94-4e9c-4c20-96e1-845ef493a8a8",
              "title": "Crew",
              "description": ""
          }
      },
      "criteriaOrder": [
          "a016d7cc-70a7-4b52-85f1-01554faff042",
          "64ecd3f7-3c60-4483-a525-4520e5865a8c",
          "98d46034-f94d-43ab-8c6a-f0bfead571a7",
          "ab8be201-a451-4a75-9748-ba81010e05fe",
          "291b2b94-4e9c-4c20-96e1-845ef493a8a8"
      ]
  },
  "comparisons": {
      "id": "63f7beaf-7954-4984-a5d8-230c53a48b5a",
      "criteria": [
          [
              0,
              0,
              2,
              2,
              1
          ],
          [
              0,
              0,
              2,
              -1,
              -1
          ],
          [
              -2,
              -2,
              0,
              -2,
              -2
          ],
          [
              -2,
              1,
              2,
              0,
              -1
          ],
          [
              -1,
              1,
              2,
              1,
              0
          ]
      ],
      "alternatives": {
          "a016d7cc-70a7-4b52-85f1-01554faff042": [
              [
                  0,
                  4,
                  3
              ],
              [
                  -4,
                  0,
                  0
              ],
              [
                  -3,
                  0,
                  0
              ]
          ],
          "64ecd3f7-3c60-4483-a525-4520e5865a8c": [
              [
                  0,
                  -4,
                  -3
              ],
              [
                  4,
                  0,
                  1
              ],
              [
                  3,
                  -1,
                  0
              ]
          ],
          "98d46034-f94d-43ab-8c6a-f0bfead571a7": [
              [
                  0,
                  -2,
                  -2
              ],
              [
                  2,
                  0,
                  2
              ],
              [
                  2,
                  -2,
                  0
              ]
          ],
          "ab8be201-a451-4a75-9748-ba81010e05fe": [
              [
                  0,
                  -1,
                  -2
              ],
              [
                  1,
                  0,
                  -2
              ],
              [
                  2,
                  2,
                  0
              ]
          ],
          "291b2b94-4e9c-4c20-96e1-845ef493a8a8": [
              [
                  0,
                  7,
                  7
              ],
              [
                  -7,
                  0,
                  0
              ],
              [
                  -7,
                  0,
                  0
              ]
          ]
      }
  },
  "step": 6
}