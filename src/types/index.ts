export type TrainingItem = {
  id: number;
  name: string;
  created_at: string;
  progress: number;
  logs: string;
  analysis_id: number;
  train_set: number[];
  validation_set: number[];
};

export type TrainingArray = TrainingItem[];

export type SetItem = {
  classes: string[];
  confusion_matrix: number[][];
  'f1-score': number[];
};

export type TrainingResult = {
  id: string;
  train_set: SetItem;
  validation_set: SetItem;
};

export type Annotation = {
  analysis_id: number;
  annotation: {
    name: string;
    color: [number, number, number];
  };
};

export type DataItem = {
  id: number;
  created_at: string;
  annotations: Annotation[];
  image: string;
};

export type DataArray = DataItem[];

type Label = {
  name: string;
  color: [number, number, number];
};

type Labels = {
  [key: string]: Label;
};

export type Analysis = {
  id: number;
  name: string;
  created_at: string;
  labels: Labels;
  test_set: number[];
};

export type countObj = {
  count: number;
};

export type AnalysisArray = Analysis[];
