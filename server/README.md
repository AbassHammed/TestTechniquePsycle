# API

## Prerequisites

- Install python, pyenv & pip if necessary.
- Install virtualenv (isolate app with its depedencies)

```
make init-venv
```

## Install and run

Initialize the virtualenv and install dependencies:

```
$ make init
```

Run the application:

```
$ make run
```

You can run app on different port (default port is 5000)

```
$ PORT=5001 make run
```

## Endpoints

- Trainings

  - `[GET] http://localhost:5000/trainings` => Get list
  - `[POST] http://localhost:5000/trainings` => Create training
  - `[GET] http://localhost:5000/trainings/1` => Get training details
  - `[GET] http://localhost:5000/trainings/1/result` => Get training result

- Analysis

  - `[GET] http://localhost:5000/analysis` => Get list
  - `[GET] http://localhost:5000/analysis/1` => Get analysis details

- Data

  - `[GET] http://localhost:5000/data` => Get list (first page)
  - `[GET] http://localhost:5000/data/count` => Get count
  - `[GET] http://localhost:5000/data/count?label=bonne` => Get count by label
  - `[GET] http://localhost:5000/data/1/image` => Get data image
