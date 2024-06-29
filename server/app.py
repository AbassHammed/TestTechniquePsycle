import argparse
import json
import os
import random

from datetime import datetime, timedelta
import sys
from threading import Event, Thread
import threading
import time
from typing import Any, Dict, List, Optional
from flask import Flask, request, render_template, send_file

OK_LABEL = {"name": "bonne", "color": [0, 255, 0]}
NOT_OK_LABEL = {"name": "cassée", "color": [0, 0, 255]}


class App:
    def __init__(self):
        self._update_thread: Optional[Thread] = None
        self._must_stop_event = Event()
        self._app = Flask(__name__)

        self._analysis = []
        self._data = []
        self._trainings = []
        self._trainings_set = []
        self._trainings_result = {}
        self._current_training: Dict = None
        self._current_train_set = None
        self._current_validation_set = None
        self._page_size = 20

    def run(self):
        print("call run")
        self._build_trainings()

        self._update_thread = Thread(target=self._update_current_training, daemon=True)
        self._update_thread.start()

        self._bootstrap_flask()
        self._falsk_thread = threading.Thread(target=self._run_flask, daemon=True)
        self._falsk_thread.start()

        while 1:
            time.sleep(1)
            continue

    def _bootstrap_flask(self):
        @self._app.after_request
        def add_accept_origin(request):
            request.headers["Access-Control-Allow-Origin"] = "*"
            request.headers["Access-Control-Allow-Headers"] = "*"
            return request

        @self._app.route("/trainings", methods=["GET", "POST"])
        def trainings():
            if request.method == "POST":
                if self._current_training is not None:
                    return "Training running", 400

                id = len(self._trainings) + 1

                random.shuffle(self._trainings_set)

                train_set = [d for d in self._trainings_set[20:]]
                validation_set = [d for d in self._trainings_set[:20]]

                new_training = {
                    "id": id,
                    "name": f"Apprentissage #{id}",
                    "created_at": datetime.now().isoformat(),
                    "progress": 0,
                    "logs": "Début de l'apprentissage",
                    "analysis_id": 1,
                    "train_set": [d.get("id") for d in train_set],
                    "validation_set": [d.get("id") for d in validation_set],
                }

                self._trainings.append(new_training)

                self._current_train_set = train_set
                self._current_validation_set = validation_set
                self._current_training = new_training

                return (
                    json.dumps(new_training),
                    201,
                    {"content-type": "application/json"},
                )

            return (
                json.dumps(self._trainings),
                200,
                {"content-type": "application/json"},
            )

        @self._app.route("/trainings/<int:id>")
        def training(id):
            training = next((t for t in self._trainings if t.get("id") == id), None)
            if training is not None:
                return json.dumps(training), 200, {"content-type": "application/json"}
            return "", 404

        @self._app.route("/trainings/<int:id>/result")
        def training_result(id):
            result = self._trainings_result.get(id)
            if result is not None:
                return json.dumps(result), 200, {"content-type": "application/json"}
            return "", 404

        @self._app.route("/analysis")
        def analysis_list():
            return json.dumps(self._analysis), 200, {"content-type": "application/json"}

        @self._app.route("/analysis/<int:id>")
        def analysis(id):
            training = next((a for a in self._analysis if a.get("id") == id), None)
            if training is not None:
                return json.dumps(training), 200, {"content-type": "application/json"}
            return "", 404

        @self._app.route("/data")
        def data():
            return (
                json.dumps(self._data),
                200,
                {"content-type": "application/json"},
            )

        @self._app.route("/data/count")
        def data_count():
            label_arg = request.args.get("label", None)
            if label_arg is None:
                count = len(self._data)
            else:
                count = len(
                    [
                        d
                        for d in self._data
                        if d["annotations"][0]["annotation"]["name"] == label_arg
                    ]
                )
            return (
                json.dumps({"count": count}),
                200,
                {"content-type": "application/json"},
            )

        @self._app.route("/data/<int:data_id>")
        def data_details(data_id):
            try:
                data = self._data[data_id - 1]
            except KeyError:
                return "", 404
            return json.dumps(data), 200, {"content-type": "application/json"}

        @self._app.route("/data/<int:data_id>/image")
        def data_details_image(data_id):
            try:
                data = self._data[data_id - 1]
            except KeyError:
                return "", 404

            return send_file(
                mimetype="image/jpeg",
                path_or_file=data["image"],
            )

    def _run_flask(self):
        parser = argparse.ArgumentParser(description="API")
        parser.add_argument(
            "-p",
            "--port",
            type=int,
            default=os.getenv("PORT", "5000"),
            help="TCP Port to listen to.",
        )
        args = parser.parse_args()

        try:
            self._app.run(host="0.0.0.0", port=args.port, threaded=True)
        except:
            sys.stdout.flush()
            sys.stderr.flush()
            os._exit(1)  # pylint: disable=protected-access

    def _build_trainings(self):
        """Build random trainings, locally storaed for the lifetime of the app."""
        data = list(self._build_data())
        random.shuffle(data)
        test_set = [d.get("id") for d in data[:20]]
        remaining_data = [d for d in data[20:]]
        analysis = [
            {
                "id": 1,
                "name": "Classification amandes",
                "created_at": (datetime.now() - timedelta(days=730)).isoformat(),
                "labels": {
                    "0": OK_LABEL,
                    "1": NOT_OK_LABEL,
                },
                "test_set": test_set,
            }
        ]
        trainings = []
        trainings_results = {}

        for id in range(1, 4):
            random.shuffle(remaining_data)

            train_set = [d for d in remaining_data[20:]]
            validation_set = [d for d in remaining_data[:20]]

            logs = "Début de l'apprentissage"
            i = 0
            while i < 100:
                i = min(i + random.randint(5, 15), 100)
                logs += f"\rProgression: {i}%"

            logs += "\rFin de l'apprentissage"

            new_training = {
                "id": id,
                "name": f"Apprentissage numéro #{id}",
                "created_at" : datetime.now() .isoformat(),
                "progress": 100,
                "logs": logs,
                "analysis_id": 1,
                "train_set": [d.get("id") for d in train_set],
                "validation_set": [d.get("id") for d in validation_set],
            }
            trainings.append(new_training)
            trainings_results.update(
                {
                    new_training.get("id"): self._build_training_result(
                        train_set, validation_set
                    )
                }
            )

        self._analysis = analysis
        self._data = sorted(data, key=lambda x: x["id"])
        self._trainings_set = remaining_data
        self._trainings = trainings
        self._trainings_result = trainings_results

    def _build_data(self):
        """Build random data, locally stored for the lifetime of the app."""
        for id_ in range(1, 101):
            d = datetime.now() - timedelta(days=id_)
            rand_num = random.random()
            current_annotation, current_image = (
                (OK_LABEL, "amande_1.jpeg")
                if rand_num <= 0.5
                else (NOT_OK_LABEL, "amande_2.jpeg")
            )

            yield {
                "id": id_,
                "created_at": d.isoformat(),
                "annotations": [{"analysis_id": 1, "annotation": current_annotation}],
                "image": current_image,
            }

    def _build_training_result(
        self, train_set: List[Dict[str, Any]], validation_set: List[Dict[str, Any]]
    ):
        result = {
            "train_set": {
                "classes": ["bonne", "cassée"],
                "confusion_matrix": [[0, 0], [0, 0]],
                "f1-score": [0, 0],
            },
            "validation_set": {
                "classes": ["bonne", "cassée"],
                "confusion_matrix": [[0, 0], [0, 0]],
                "f1-score": [0, 0],
            },
        }

        for dataset in [train_set, validation_set]:
            dict_to_update = result.get(
                "train_set" if dataset == train_set else "validation_set"
            )

            for data in dataset:
                annotations: List[Dict[str, Any]] = data.get("annotations")
                annot: Dict = annotations[0].get("annotation")

                guess = "bonne" if random.random() < 0.5 else "cassée"
                is_ok = guess == annot.get("name")

                matrix = dict_to_update.get("confusion_matrix")
                new_matrix = [
                    [
                        matrix[0][0] + 1
                        if is_ok and guess == "bonne"
                        else matrix[0][0],
                        matrix[0][1] + 1
                        if not is_ok and guess == "cassée"
                        else matrix[0][1],
                    ],
                    [
                        matrix[1][0] + 1
                        if not is_ok and guess == "bonne"
                        else matrix[1][0],
                        matrix[1][1] + 1
                        if is_ok and guess == "cassée"
                        else matrix[1][1],
                    ],
                ]
                dict_to_update.update({"confusion_matrix": new_matrix})

            matrix = dict_to_update.get("confusion_matrix")
            new_score = [
                matrix[0][0] / (matrix[0][0] + matrix[0][1]),
                matrix[1][1] / (matrix[1][1] + matrix[1][0]),
            ]

            dict_to_update.update({"f1-score": new_score})

        return result

    def _update_current_training(self):
        while not self._must_stop_event.wait(timeout=5):
            if self._current_training is not None:
                progress = self._current_training.get("progress", 0)
                logs = self._current_training.get("logs", "Début de l'apprentissage")

                newProgress = min(progress + random.randint(5, 15), 100)

                logs += f"\rProgression: {newProgress}%"
                if newProgress == 100:
                    logs += "\rFin de l'apprentissage"

                self._current_training.update({"progress": newProgress, "logs": logs})

                if newProgress == 100:
                    self._trainings_result.update(
                        {
                            self._current_training.get(
                                "id"
                            ): self._build_training_result(
                                self._current_train_set, self._current_validation_set
                            )
                        }
                    )
                    self._current_training = None

    def stop(self):
        if self._update_thread is not None:
            self._must_stop_event.set()
            self._update_thread.join()
            self._update_thread = None


def main():
    testapp = App()

    try:
        testapp.run()
    except Exception as e:
        print(f"{e}")
        testapp.stop()


if __name__ == "__main__":
    main()
