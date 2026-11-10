/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  UploadCloud,
  SlidersHorizontal,
  Cpu,
  BarChart3,
  Sparkles,
  Database,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCw,
  ShieldCheck,
  Zap
} from 'lucide-react';

import { Sidebar, NavTab } from './components/Sidebar';
import { Header } from './components/Header';
import { DatasetUpload } from './components/DatasetUpload';
import { DatasetExplorer } from './components/DatasetExplorer';
import { ModelConfiguration } from './components/ModelConfiguration';
import { ModelTraining } from './components/ModelTraining';
import { ModelEvaluation } from './components/ModelEvaluation';
import { PredictionInterface } from './components/PredictionInterface';
import { SavedModels } from './components/SavedModels';
import { ProjectReport } from './components/ProjectReport';

import {
  DatasetSummary,
  ModelConfiguration as IModelConfig,
  ModelMetrics,
  ConfigureResponse
} from './types/automl';
import { checkBackendHealth, getDatasetSummary, getDatasetConfig, configureDataset } from './services/api';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('overview');
  const [dataset, setDataset] = useState<DatasetSummary | null>(null);
  const [config, setConfig] = useState<IModelConfig | null>(null);
  const [configResponse, setConfigResponse] = useState<ConfigureResponse | null>(null);
  const [metrics, setMetrics] = useState<ModelMetrics | null>(null);
  const [activeModelId, setActiveModelId] = useState<string | undefined>(undefined);
  const [isBackendReady, setIsBackendReady] = useState<boolean | null>(null);
  const [isAutoConfiguring, setIsAutoConfiguring] = useState(false);
  const [autoConfigError, setAutoConfigError] = useState<string | null>(null);

  // Check backend health and restore session state on mount
  useEffect(() => {
    const pollHealth = async () => {
      const isHealthy = await checkBackendHealth();
      setIsBackendReady(isHealthy);
      if (isHealthy) {
        try {
          const existingSummary = await getDatasetSummary();
          setDataset(existingSummary);

          // Restore config from backend or localStorage
          const existingConfig = await getDatasetConfig();
          if (existingConfig.configured && existingConfig.config) {
            setConfig(existingConfig.config);
          } else {
            const saved = localStorage.getItem('automl_active_config');
            if (saved) {
              try {
                setConfig(JSON.parse(saved));
              } catch {}
            }
          }
        } catch {
          // No dataset previously loaded
        }
      }
    };
    pollHealth();
  }, []);

  const handleDatasetLoaded = (newSummary: DatasetSummary) => {
    setDataset(newSummary);
    // Reset downstream configuration and metrics for new dataset
    setConfig(null);
    setConfigResponse(null);
    setMetrics(null);
    setActiveModelId(undefined);
    try {
      localStorage.removeItem('automl_active_config');
    } catch {}
    setCurrentTab('upload');
  };

  const handleConfigured = (newConfig: IModelConfig, response: ConfigureResponse) => {
    setConfig(newConfig);
    setConfigResponse(response);
    try {
      localStorage.setItem('automl_active_config', JSON.stringify(newConfig));
    } catch {}
  };

  const handleAutoConfigure = async () => {
    if (!dataset || dataset.columns.length < 2) return;
    setIsAutoConfiguring(true);
    setAutoConfigError(null);

    // Pick candidate target: column named 'class', 'target', 'label', 'outcome', or last column
    const candidates = ['class', 'target', 'label', 'outcome', 'species', 'defects', 'problems'];
    let targetCol = dataset.columns[dataset.columns.length - 1].name;
    for (const c of dataset.columns) {
      if (candidates.includes(c.name.toLowerCase())) {
        targetCol = c.name;
        break;
      }
    }

    const featureCols = dataset.columns.map((c) => c.name).filter((n) => n !== targetCol);
    const targetStat = dataset.columns.find((c) => c.name === targetCol);
    const taskType: 'classification' | 'regression' =
      !targetStat?.is_numerical || (targetStat?.unique_count ?? 0) <= 15 ? 'classification' : 'regression';

    const autoConfig: IModelConfig = {
      target_column: targetCol,
      feature_columns: featureCols,
      task_type: taskType,
      test_size: 0.2,
      random_seed: 42,
      imputation_strategy: 'median',
      scaling: true,
    };

    try {
      const res = await configureDataset(autoConfig);
      handleConfigured(autoConfig, res);
    } catch (err: any) {
      setAutoConfigError(err.message || 'Auto-configuration failed.');
    } finally {
      setIsAutoConfiguring(false);
    }
  };

  const handleTrainingComplete = (newMetrics: ModelMetrics) => {
    setMetrics(newMetrics);
  };

  const handleModelSaved = (modelId: string) => {
    setActiveModelId(modelId);
  };

  const handleModelLoaded = (loadedData: any) => {
    setActiveModelId(loadedData.id);
    if (loadedData.config) {
      setConfig(loadedData.config);
      try {
        localStorage.setItem('automl_active_config', JSON.stringify(loadedData.config));
      } catch {}
    }
    if (loadedData.metrics) {
      setMetrics(loadedData.metrics);
    }
    setCurrentTab('evaluate');
  };

  const handleRefresh = async () => {
    const isHealthy = await checkBackendHealth();
    setIsBackendReady(isHealthy);
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        hasDataset={dataset !== null}
        hasConfig={config !== null}
        hasModel={metrics !== null}
        activeDatasetName={dataset?.filename}
        activeModelName={metrics?.algorithm}
      />

      {/* Main View Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <Header
          currentTab={currentTab}
          activeDatasetName={dataset?.filename}
          activeAlgorithm={metrics?.algorithm}
          taskType={config?.task_type}
          onQuickUpload={() => setCurrentTab('upload')}
          onRefresh={handleRefresh}
        />

        {/* Scrollable Workspace Body */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-slate-950/90">
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {currentTab === 'overview' && (
            <div className="max-w-6xl mx-auto space-y-8">
              {/* Hero Banner */}
              <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-950/60 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-lg relative overflow-hidden">
                <div className="relative z-10 max-w-3xl space-y-3">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-900/40 border border-blue-700/60 text-blue-300 text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Real Scikit-learn ML Pipelines & Zero Data Leakage</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Automate Your Machine Learning Workflow
                  </h1>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Upload your CSV datasets, explore statistical distributions, configure leak-free preprocessing, train 11 Scikit-learn algorithms, fine-tune hyperparameters via K-Fold GridSearchCV, and run predictions instantly.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setCurrentTab('upload')}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-blue-600/30 transition flex items-center space-x-2"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>{dataset ? 'Manage Datasets' : 'Upload or Load Benchmark Dataset'}</span>
                    </button>

                    <button
                      onClick={() => setCurrentTab('report')}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition flex items-center space-x-2"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Technical Architecture Report</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Workflow Pipeline Stepper Cards */}
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                  End-to-End Workflow Pipeline
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Step 1 */}
                  <div
                    onClick={() => setCurrentTab('upload')}
                    className={`p-5 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                      dataset
                        ? 'bg-slate-900 border-emerald-500/50'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Step 1
                        </span>
                        {dataset ? (
                          <span className="p-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <UploadCloud className="w-4 h-4 text-slate-500" />
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1">Dataset Ingestion</h4>
                      <p className="text-xs text-slate-400">
                        {dataset
                          ? `${dataset.filename} (${dataset.total_rows_cleaned} rows, ${dataset.total_columns} cols)`
                          : 'Upload CSV or select Iris / Wine / Housing benchmark.'}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center text-xs font-medium text-blue-400">
                      <span>{dataset ? 'Explore dataset' : 'Upload CSV'}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div
                    onClick={() => dataset && setCurrentTab('configure')}
                    className={`p-5 rounded-2xl border transition flex flex-col justify-between ${
                      !dataset
                        ? 'bg-slate-900/30 border-slate-900 opacity-50 cursor-not-allowed'
                        : config
                        ? 'bg-slate-900 border-emerald-500/50 cursor-pointer'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 cursor-pointer'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Step 2
                        </span>
                        {config ? (
                          <span className="p-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <SlidersHorizontal className="w-4 h-4 text-slate-500" />
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1">Preprocessing & Target</h4>
                      <p className="text-xs text-slate-400">
                        {config
                          ? `Target: ${config.target_column} (${config.task_type})`
                          : 'Select target column, features, task type, and split.'}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center text-xs font-medium text-blue-400">
                      <span>{config ? 'Reconfigure' : 'Configure schema'}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div
                    onClick={() => dataset && setCurrentTab('train')}
                    className={`p-5 rounded-2xl border transition flex flex-col justify-between ${
                      !dataset
                        ? 'bg-slate-900/30 border-slate-900 opacity-50 cursor-not-allowed'
                        : metrics
                        ? 'bg-slate-900 border-emerald-500/50 cursor-pointer'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 cursor-pointer'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Step 3
                        </span>
                        {metrics ? (
                          <span className="p-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <Cpu className="w-4 h-4 text-slate-500" />
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1">Train & Fine-Tune</h4>
                      <p className="text-xs text-slate-400">
                        {metrics
                          ? `${metrics.algorithm} (${metrics.is_tuned ? 'Tuned' : 'Baseline'})`
                          : 'Fit 11 Scikit-learn algorithms with K-Fold Grid Search.'}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center text-xs font-medium text-blue-400">
                      <span>{metrics ? 'Retrain / Tune' : 'Train models'}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div
                    onClick={() => metrics && setCurrentTab('evaluate')}
                    className={`p-5 rounded-2xl border transition flex flex-col justify-between ${
                      !metrics
                        ? 'bg-slate-900/30 border-slate-900 opacity-50 cursor-not-allowed'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700 cursor-pointer'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Step 4
                        </span>
                        <BarChart3 className="w-4 h-4 text-indigo-400" />
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1">Evaluate & Predict</h4>
                      <p className="text-xs text-slate-400">
                        {metrics
                          ? metrics.task_type === 'classification'
                            ? `Accuracy: ${((metrics.accuracy ?? 0) * 100).toFixed(1)}% • F1: ${((metrics.f1_score ?? 0) * 100).toFixed(1)}%`
                            : `R²: ${(metrics.r2 ?? 0).toFixed(3)} • RMSE: ${(metrics.rmse ?? 0).toFixed(3)}`
                          : 'Confusion matrix, ROC, residuals, and prediction form.'}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center text-xs font-medium text-blue-400">
                      <span>{metrics ? 'View evaluation' : 'Awaiting training'}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Dataset Inspection Preview if Loaded */}
              {dataset && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Active Ingested Dataset Overview
                    </h3>
                    <button
                      onClick={() => setCurrentTab('configure')}
                      className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                    >
                      <span>Proceed to Preprocessing</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <DatasetExplorer summary={dataset} />
                </div>
              )}
            </div>
          )}

          {/* TAB 2: DATASET UPLOAD & EXPLORATION */}
          {currentTab === 'upload' && (
            <div className="space-y-6">
              <DatasetUpload
                onDatasetLoaded={handleDatasetLoaded}
                onProceedToConfigure={() => setCurrentTab('configure')}
                currentDataset={dataset}
              />

              {dataset && (
                <div className="mt-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white tracking-tight">
                      Dataset Schema & Statistical Profile
                    </h3>
                    <button
                      onClick={() => setCurrentTab('configure')}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition flex items-center space-x-1.5"
                    >
                      <span>Configure Target & Features</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <DatasetExplorer summary={dataset} />
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CONFIGURATION & PREPROCESSING */}
          {currentTab === 'configure' && (
            dataset ? (
              <ModelConfiguration
                dataset={dataset}
                initialConfig={config}
                onConfigured={handleConfigured}
                onProceedToTrain={() => setCurrentTab('train')}
              />
            ) : (
              <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
                <UploadCloud className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-white">No Dataset Loaded</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Please upload a CSV or load a benchmark dataset before configuring features.
                </p>
                <button
                  onClick={() => setCurrentTab('upload')}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                >
                  Go to Dataset Upload
                </button>
              </div>
            )
          )}

          {/* TAB 4: MODEL TRAINING & TUNING */}
          {currentTab === 'train' && (
            config ? (
              <ModelTraining
                config={config}
                onTrainingComplete={handleTrainingComplete}
                onProceedToEvaluate={() => setCurrentTab('evaluate')}
                lastMetrics={metrics}
              />
            ) : (
              <div className="p-10 text-center bg-slate-900 border border-slate-800 rounded-2xl max-w-xl mx-auto space-y-5 my-8">
                <div className="w-14 h-14 rounded-2xl bg-indigo-950/80 border border-indigo-800/80 flex items-center justify-center text-indigo-400 mx-auto shadow-inner">
                  <SlidersHorizontal className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Pipeline Needs Preprocessing Setup</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto leading-relaxed">
                    Target variable and input features for <strong className="text-slate-200">{dataset?.filename || 'the dataset'}</strong> must be confirmed before training models.
                  </p>
                </div>

                {autoConfigError && (
                  <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-200 text-xs">
                    {autoConfigError}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleAutoConfigure}
                    disabled={isAutoConfiguring}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-blue-600/20 transition flex items-center justify-center space-x-2"
                  >
                    <Zap className="w-4 h-4" />
                    <span>{isAutoConfiguring ? 'Configuring Pipeline...' : 'Auto-Confirm Defaults & Train'}</span>
                  </button>
                  <button
                    onClick={() => setCurrentTab('configure')}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
                  >
                    Step 2: Custom Configuration
                  </button>
                </div>
              </div>
            )
          )}

          {/* TAB 5: EVALUATION & STATISTICAL CHARTS */}
          {currentTab === 'evaluate' && (
            metrics ? (
              <ModelEvaluation
                metrics={metrics}
                onProceedToPredict={() => setCurrentTab('predict')}
                onModelSaved={handleModelSaved}
              />
            ) : (
              <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
                <Cpu className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-white">No Model Trained Yet</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Train a baseline model or fine-tune hyperparameters to view statistical evaluation plots.
                </p>
                <button
                  onClick={() => setCurrentTab('train')}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                >
                  Go to Model Training
                </button>
              </div>
            )
          )}

          {/* TAB 6: INFERENCE & PREDICTIONS */}
          {currentTab === 'predict' && (
            config ? (
              <PredictionInterface
                config={config}
                activeModelName={metrics?.algorithm}
                columnStats={dataset?.columns}
              />
            ) : (
              <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
                <Sparkles className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-white">Model Not Ready for Inference</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Please configure and train a pipeline first or load an existing model from the registry.
                </p>
                <button
                  onClick={() => setCurrentTab('models')}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                >
                  Open Saved Models Registry
                </button>
              </div>
            )
          )}

          {/* TAB 7: SAVED MODELS REGISTRY */}
          {currentTab === 'models' && (
            <SavedModels
              onModelLoaded={handleModelLoaded}
              onProceedToPredict={() => setCurrentTab('predict')}
              activeModelId={activeModelId}
            />
          )}

          {/* TAB 8: ACADEMIC REPORT */}
          {currentTab === 'report' && <ProjectReport />}
        </main>
      </div>
    </div>
  );
}
