# Project estruture

```
project
│
├── src
│   ├── app
│   │   ├── account
│   │   │   ├── entities
│   │   │   │   └── object-values
│   │   │   ├── model
│   │   │   ├── events
│   │   │   ├── repository
│   │   │   └── use-case
│   │   │       └── error
│   │   │
│   │   └── notification
│   │       ├── entities
│   │       │   └── object-values
│   │       ├── events
│   │       ├── models
│   │       ├── repository
│   │       └── use-case
│   │           └── error
│   │
│   ├── infra
│   │   ├── cache
│   │   ├── cryptography
│   │   ├── database
│   │   ├── environment
│   │   ├── http
│   │   └── smtp
│   │
│   └── shared
│       ├── aggregates
│       ├── entity
│       ├── errors
│       ├── events
│       ├── object-values
│       ├── types
│       └── utils
│
├── docs
├── .volumes ( for docker )
│
└── __test__
    ├── _shared
    ├── factories
    ├── repositories
    ├── e2e
    │   ├── account
    │   │   └── use-case
    │   └── notification
    │       └── use-case
    └── unit
        ├── account
        │   └── use-case
        └── notification
            └── use-case
```
