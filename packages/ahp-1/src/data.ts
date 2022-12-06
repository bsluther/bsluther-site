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