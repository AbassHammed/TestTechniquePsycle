PYTHON_VERSION = 3.11.0

PIP = env/bin/pip
PYTHON = env/bin/python
VIRTUALENV = $(PYENV_ROOT)/versions/$(PYTHON_VERSION)/bin/virtualenv

init-venv:
	pyenv install -s $(PYTHON_VERSION)  # make sure expected python version is available
	$(PYENV_ROOT)/versions/$(PYTHON_VERSION)/bin/pip install virtualenv  # ensure virtualenv is installed for given python
	if [ ! "$(shell $(PYTHON) -V)" = "Python $(PYTHON_VERSION)" ]; then \
		echo "WARNING: python version mismatch => reset virtualenv" && rm -rf env/; \
	fi
	if [ ! -d env/ ]; then \
		$(VIRTUALENV) env/; \
	fi
	$(PIP) install -qU pip


init:
	$(PIP) install -Ur requirements.txt


run:
	$(PYTHON) app.py


clean:
	find . -name '*.pyc' -delete
	find . -name '__pycache' -type d -delete
	rm -rf env


.PHONY: init-venv init run clean
.SILENT: init-venv init run clean
