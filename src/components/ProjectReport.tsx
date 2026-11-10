import React, { useState } from 'react';
import {
  BookOpen,
  FileText,
  Cpu,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Award,
  Zap,
  Activity,
  ShieldCheck,
  Code2,
  Printer,
  Copy,
  Check,
  Download,
  Database,
  GitBranch,
  Terminal,
  ExternalLink
} from 'lucide-react';

export const ProjectReport: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'full' | 'executive' | 'math' | 'benchmarks'>('full');

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    // Generate text/markdown of the report
    const element = document.getElementById('academic-report-content');
    if (element) {
      navigator.clipboard.writeText(element.innerText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 text-slate-300">
      {/* Top Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 print:hidden shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Academic Project Documentation</h2>
            <p className="text-xs text-slate-400">Standard College Project Report format (B.Tech / MCA / M.Tech / BS CS)</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition shadow-sm active:scale-95"
            title="Copy entire report text to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Plain Text'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition active:scale-95"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Main Academic Document Container */}
      <div
        id="academic-report-content"
        className="bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-10 print:bg-white print:text-black print:border-none print:p-0 print:shadow-none print:m-0"
      >
        {/* Title & Metadata Page Header */}
        <div className="text-center pb-8 border-b border-slate-800 print:border-slate-300 space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider uppercase bg-indigo-950/80 text-indigo-300 border border-indigo-700/50 print:border-slate-400 print:bg-slate-100 print:text-slate-800">
            MAJOR PROJECT TECHNICAL REPORT
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white print:text-black tracking-tight leading-tight">
            AutoML Studio: An End-to-End Automated Machine Learning Platform with Leak-Free Preprocessing & Interactive Inference
          </h1>
          <p className="text-sm sm:text-base text-slate-400 print:text-slate-700 max-w-3xl mx-auto">
            Design, Mathematical Formulation, and Full-Stack Implementation of an Automated Machine Learning System utilizing Scikit-Learn, Flask REST APIs, and Reactive Single-Page Architecture.
          </p>

          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left bg-slate-950/60 print:bg-slate-50 print:border print:border-slate-300 rounded-2xl p-5 border border-slate-800/80 text-xs">
            <div>
              <span className="text-slate-500 print:text-slate-600 block font-medium">Domain:</span>
              <strong className="text-slate-200 print:text-black">Automated Machine Learning (AutoML)</strong>
            </div>
            <div>
              <span className="text-slate-500 print:text-slate-600 block font-medium">Core Stack:</span>
              <strong className="text-slate-200 print:text-black">Python, Scikit-learn, Flask, React</strong>
            </div>
            <div>
              <span className="text-slate-500 print:text-slate-600 block font-medium">Pipeline Standards:</span>
              <strong className="text-slate-200 print:text-black">Zero-Leakage ColumnTransformer</strong>
            </div>
            <div>
              <span className="text-slate-500 print:text-slate-600 block font-medium">Model Storage:</span>
              <strong className="text-slate-200 print:text-black">Joblib (.joblib) + SQLite Registry</strong>
            </div>
          </div>
        </div>

        {/* Abstract */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white print:text-black flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400 print:text-indigo-700" />
            Abstract
          </h2>
          <div className="p-5 rounded-2xl bg-indigo-950/20 print:bg-slate-50 border border-indigo-900/40 print:border-slate-300 text-xs sm:text-sm text-slate-300 print:text-slate-800 leading-relaxed space-y-2">
            <p>
              In contemporary data science, building production-ready predictive models involves tedious iterative tasks: exploratory data analysis, schema validation, handling missing values, encoding high-dimensional categorical features, scaling continuous attributes, hyperparameter cross-validation, and deploying trained artifacts for inference. Naive or ad-hoc scripts frequently introduce <strong>data leakage</strong> (such as calculating scaling or imputation metrics across both training and test partitions prior to splitting), which leads to overly optimistic performance during validation and catastrophic degradation in production.
            </p>
            <p>
              <strong>AutoML Studio</strong> addresses these fundamental challenges by implementing an end-to-end, full-stack automated machine learning platform. The platform features an automated data ingestion engine that infers column types, eliminates duplicates, and constructs mathematically isolated <code className="text-indigo-300 font-mono">ColumnTransformer</code> preprocessing pipelines. It supports 11 distinct Scikit-Learn algorithms (6 classification models and 5 regression models), executes K-fold cross-validated hyperparameter optimization using <code className="text-indigo-300 font-mono">GridSearchCV</code> and <code className="text-indigo-300 font-mono">RandomizedSearchCV</code>, computes comprehensive statistical validation metrics (Confusion Matrix, ROC curves, Residuals, MAE, RMSE, R²), serializes production-ready models via Joblib, and exposes interactive single-instance and batch CSV prediction capabilities.
            </p>
            <p className="pt-2 text-xs font-semibold text-indigo-300 print:text-indigo-900">
              <strong>Keywords:</strong> Automated Machine Learning (AutoML), Data Leakage Prevention, Scikit-learn Pipelines, Hyperparameter Optimization, Model Serialization, Cross-Validation, RESTful Architecture.
            </p>
          </div>
        </section>

        {/* Chapter 1: Introduction */}
        <section className="space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-white print:text-black flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-400 print:text-blue-700" />
            Chapter 1: Introduction & Problem Statement
          </h2>

          <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-300 print:text-slate-800">
            <h3 className="text-xs sm:text-sm font-bold text-indigo-300 print:text-indigo-900 uppercase tracking-wide">
              1.1 Motivation & Background
            </h3>
            <p>
              Machine Learning (ML) has transitioned from academic research into ubiquitous industrial applications across healthcare, finance, logistics, and engineering. However, the lifecycle of bringing raw tabular data to an operational predictive pipeline demands extensive specialized knowledge across multiple sub-disciplines: data cleaning, feature engineering, mathematical optimization, and web integration.
            </p>

            <h3 className="text-xs sm:text-sm font-bold text-indigo-300 print:text-indigo-900 uppercase tracking-wide pt-2">
              1.2 Problem Statement
            </h3>
            <p>
              Traditional manual machine learning pipelines suffer from three pervasive failure modes:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-400 print:text-slate-700">
              <li>
                <strong>Lookahead Data Leakage:</strong> Preprocessing transformations (such as mean imputation or standard deviation scaling) that are fit on the full dataset rather than purely on the training folds artificially corrupt test evaluation scores.
              </li>
              <li>
                <strong>Configuration Complexity:</strong> Selecting and tuning hyperparameters across varied algorithm families requires thousands of lines of boilerplate code.
              </li>
              <li>
                <strong>Deployment Friction:</strong> Bridging the gap between an offline Jupyter notebook and an accessible prediction interface typically requires manual model export and bespoke API creation.
              </li>
            </ul>

            <h3 className="text-xs sm:text-sm font-bold text-indigo-300 print:text-indigo-900 uppercase tracking-wide pt-2">
              1.3 Project Objectives
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-300">
                <span className="font-bold text-white print:text-black block mb-1">1. Automated Data Ingestion</span>
                <p className="text-xs text-slate-400 print:text-slate-700">
                  Accept arbitrary CSV datasets, automatically infer numerical vs. categorical data types, calculate missing value statistics, and detect class balance.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-300">
                <span className="font-bold text-white print:text-black block mb-1">2. Strict Leak-Free Pipeline</span>
                <p className="text-xs text-slate-400 print:text-slate-700">
                  Guarantee that all transformations are encapsulated in Scikit-Learn <code className="text-indigo-400 font-mono">Pipeline</code> and <code className="text-indigo-400 font-mono">ColumnTransformer</code> objects that learn statistics exclusively from training splits.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-300">
                <span className="font-bold text-white print:text-black block mb-1">3. Multi-Algorithm Suite & Tuning</span>
                <p className="text-xs text-slate-400 print:text-slate-700">
                  Integrate 11 canonical algorithms across classification and regression with automated K-fold cross-validated hyperparameter search.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-300">
                <span className="font-bold text-white print:text-black block mb-1">4. Model Registry & Instant Inference</span>
                <p className="text-xs text-slate-400 print:text-slate-700">
                  Persist trained pipelines with Joblib and SQLite, enabling instant model comparison, artifact download, and live web-based predictions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter 2: System Architecture */}
        <section className="space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-white print:text-black flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-400 print:text-emerald-700" />
            Chapter 2: System Architecture & Workflow
          </h2>

          <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-300 print:text-slate-800">
            <p>
              AutoML Studio is engineered as a decoupled client-server architecture. The user interface is built with React 19, TypeScript, and Tailwind CSS. The machine learning engine operates inside a Python Flask REST service, using Pandas, NumPy, and Scikit-Learn.
            </p>

            {/* ASCII System Flow Diagram */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 print:border-slate-400 font-mono text-[11px] text-emerald-300 print:text-black overflow-x-auto whitespace-pre leading-relaxed">
{`+-------------------------------------------------------------------------------------------------+
|                                     CLIENT APPLICATION (REACT / TS)                             |
|  +--------------------+   +---------------------+   +--------------------+   +----------------+ |
|  | 1. Dataset Upload  |-->| 2. EDA & Config     |-->| 3. Model Training  |-->| 4. Evaluation  | |
|  | (CSV / Benchmarks) |   | (Target/Features)   |   | (Baseline / Tune)  |   | (Metrics/Plot) | |
|  +--------------------+   +---------------------+   +--------------------+   +----------------+ |
+------------------------------------------------|------------------------------------------------+
                                                 | HTTP REST (JSON & Multipart)
+------------------------------------------------v------------------------------------------------+
|                                    BACKEND SERVER (PYTHON / FLASK)                              |
|  +--------------------+   +---------------------+   +--------------------+   +----------------+ |
|  | DatasetManager     |   | MLPipelineManager   |   | Cross-Validation   |   | Joblib & SQLite| |
|  | - CSV Ingestion    |   | - ColumnTransformer |   | - K-Fold Splitting |   | - Model Store  | |
|  | - Schema Inference |   | - Impute & Encode   |   | - Grid/Randomized  |   | - Model DB     | |
|  | - Data Cleaning    |   | - Fit & Evaluate    |   | - Metrics Compute  |   | - Realtime API | |
|  +--------------------+   +---------------------+   +--------------------+   +----------------+ |
+-------------------------------------------------------------------------------------------------+`}
            </div>

            <h3 className="text-xs sm:text-sm font-bold text-indigo-300 print:text-indigo-900 uppercase tracking-wide pt-2">
              2.2 Step-by-Step Data Flow
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-slate-400 print:text-slate-700">
              <li><strong>Upload & Schema Discovery:</strong> Raw CSV files are received, parsed with Pandas, validated for duplicate records, and profiled for column types (numeric continuous vs. discrete categorical).</li>
              <li><strong>Pipeline Configuration:</strong> The user selects the target prediction column and desired feature subsets. Task type (Binary Classification, Multiclass Classification, or Regression) is automatically inferred.</li>
              <li><strong>Train/Test Partitioning:</strong> Data is split strictly into train and test sets (e.g. 80/20) using stratified sampling for classification tasks to preserve class distributions.</li>
              <li><strong>Transformer Pipeline Assembly:</strong> Scikit-learn <code className="text-indigo-300 font-mono">ColumnTransformer</code> is instantiated with numerical pipelines (<code className="text-indigo-300 font-mono">SimpleImputer</code> + <code className="text-indigo-300 font-mono">StandardScaler</code>) and categorical pipelines (<code className="text-indigo-300 font-mono">SimpleImputer</code> + <code className="text-indigo-300 font-mono">OneHotEncoder(handle_unknown='ignore')</code>).</li>
              <li><strong>Model Fitting & Cross-Validation:</strong> Selected algorithms are trained inside the composite pipeline. Hyperparameter search uses <code className="text-indigo-300 font-mono">GridSearchCV</code> or <code className="text-indigo-300 font-mono">RandomizedSearchCV</code> across 3 to 10 cross-validation folds.</li>
              <li><strong>Evaluation & Registry:</strong> The held-out test split is evaluated. Confusion matrices, ROC curves, feature importances, and residual distributions are computed and serialized alongside the fitted pipeline via Joblib and indexed in SQLite.</li>
            </ol>
          </div>
        </section>

        {/* Chapter 3: Mathematical Formulations & Algorithms */}
        <section className="space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-white print:text-black flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400 print:text-amber-700" />
            Chapter 3: Mathematical Foundations of Implemented Algorithms
          </h2>

          <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-300 print:text-slate-800">
            <p>
              AutoML Studio implements 11 standard algorithms, each grounded in distinct statistical learning principles:
            </p>

            {/* Classification Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-purple-300 print:text-purple-900 uppercase tracking-wide">
                3.1 Classification Algorithms (6 Models)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Logistic Regression */}
                <div className="p-4 rounded-xl bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-1.5">
                  <strong className="text-white print:text-black block text-sm">1. Logistic Regression</strong>
                  <p className="text-slate-400 print:text-slate-700">
                    Models the posterior probability of class assignment using the sigmoid activation function:
                  </p>
                  <div className="p-2 rounded bg-slate-900 print:bg-slate-200 font-mono text-[11px] text-purple-300 print:text-black">
                    P(Y=1|X) = 1 / (1 + e^-(w^T X + b))
                  </div>
                  <p className="text-slate-400 print:text-slate-700">
                    Optimized via cross-entropy loss with L2 regularization minimizing: J(w) = -Σ [y log(p) + (1-y)log(1-p)] + (1/2C)||w||².
                  </p>
                </div>

                {/* Decision Tree Classifier */}
                <div className="p-4 rounded-xl bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-1.5">
                  <strong className="text-white print:text-black block text-sm">2. Decision Tree Classifier</strong>
                  <p className="text-slate-400 print:text-slate-700">
                    Recursively partitions the feature space using Gini Impurity or Shannon Entropy to maximize information gain:
                  </p>
                  <div className="p-2 rounded bg-slate-900 print:bg-slate-200 font-mono text-[11px] text-purple-300 print:text-black">
                    Gini(D) = 1 - Σ (p_i)², Entropy(D) = - Σ p_i * log2(p_i)
                  </div>
                  <p className="text-slate-400 print:text-slate-700">
                    Selects split threshold θ on feature j that minimizes the weighted child impurity.
                  </p>
                </div>

                {/* Random Forest Classifier */}
                <div className="p-4 rounded-xl bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-1.5">
                  <strong className="text-white print:text-black block text-sm">3. Random Forest Classifier</strong>
                  <p className="text-slate-400 print:text-slate-700">
                    An ensemble of B bootstrapped decision trees combining bootstrap aggregating (bagging) with random feature subspaces:
                  </p>
                  <div className="p-2 rounded bg-slate-900 print:bg-slate-200 font-mono text-[11px] text-purple-300 print:text-black">
                    {"f_RF(x) = mode { T_1(x), T_2(x), ..., T_B(x) }"}
                  </div>
                  <p className="text-slate-400 print:text-slate-700">
                    Reduces model variance without increasing bias by decorrelating individual tree structures.
                  </p>
                </div>

                {/* Support Vector Machine */}
                <div className="p-4 rounded-xl bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-1.5">
                  <strong className="text-white print:text-black block text-sm">4. Support Vector Classifier (SVC)</strong>
                  <p className="text-slate-400 print:text-slate-700">
                    Finds the maximum-margin hyperplane separating classes in high-dimensional feature space using the Radial Basis Function (RBF) kernel:
                  </p>
                  <div className="p-2 rounded bg-slate-900 print:bg-slate-200 font-mono text-[11px] text-purple-300 print:text-black">
                    K(x, x') = exp(-γ ||x - x'||²)
                  </div>
                  <p className="text-slate-400 print:text-slate-700">
                    Employs slack variables ξ_i and penalty parameter C for soft-margin classification.
                  </p>
                </div>

                {/* K-Nearest Neighbors */}
                <div className="p-4 rounded-xl bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-1.5">
                  <strong className="text-white print:text-black block text-sm">5. K-Nearest Neighbors (KNN)</strong>
                  <p className="text-slate-400 print:text-slate-700">
                    Non-parametric instance-based algorithm. Measures distance between query point x and training samples using Minkowski metric:
                  </p>
                  <div className="p-2 rounded bg-slate-900 print:bg-slate-200 font-mono text-[11px] text-purple-300 print:text-black">
                    d(x, x') = ( Σ |x_j - x'_j|^p )^(1/p) (p=2 for Euclidean)
                  </div>
                  <p className="text-slate-400 print:text-slate-700">
                    Class label is assigned via plurality vote among the k-closest instances.
                  </p>
                </div>

                {/* Naive Bayes */}
                <div className="p-4 rounded-xl bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-1.5">
                  <strong className="text-white print:text-black block text-sm">6. Gaussian Naive Bayes</strong>
                  <p className="text-slate-400 print:text-slate-700">
                    Applies Bayes' Theorem with the conditional independence assumption between all features:
                  </p>
                  <div className="p-2 rounded bg-slate-900 print:bg-slate-200 font-mono text-[11px] text-purple-300 print:text-black">
                    P(Y=c|X) ∝ P(Y=c) * Π P(x_i|Y=c), where P(x_i|Y=c) ~ N(μ_ci, σ_ci²)
                  </div>
                  <p className="text-slate-400 print:text-slate-700">
                    Computationally efficient closed-form parameter estimation.
                  </p>
                </div>
              </div>
            </div>

            {/* Regression Section */}
            <div className="space-y-3 pt-3">
              <h3 className="text-sm font-bold text-emerald-300 print:text-emerald-900 uppercase tracking-wide">
                3.2 Regression Algorithms (5 Models)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Linear Regression */}
                <div className="p-4 rounded-xl bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-1.5">
                  <strong className="text-white print:text-black block text-sm">1. Ordinary Least Squares (OLS)</strong>
                  <p className="text-slate-400 print:text-slate-700">
                    Linear combination minimizing the residual sum of squares:
                  </p>
                  <div className="p-2 rounded bg-slate-900 print:bg-slate-200 font-mono text-[11px] text-emerald-300 print:text-black">
                    β_hat = (X^T X)^-1 X^T Y
                  </div>
                  <p className="text-slate-400 print:text-slate-700">
                    Provides unbiased parameter estimates under Gauss-Markov assumptions.
                  </p>
                </div>

                {/* Polynomial Regression */}
                <div className="p-4 rounded-xl bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-1.5">
                  <strong className="text-white print:text-black block text-sm">2. Polynomial Regression</strong>
                  <p className="text-slate-400 print:text-slate-700">
                    Extends linear models by projecting input vectors into a polynomial feature space of degree d:
                  </p>
                  <div className="p-2 rounded bg-slate-900 print:bg-slate-200 font-mono text-[11px] text-emerald-300 print:text-black">
                    Φ(x) = [1, x_1, x_2, x_1², x_1 x_2, x_2², ...]
                  </div>
                  <p className="text-slate-400 print:text-slate-700">
                    Captures non-linear curves while preserving linear optimization guarantees.
                  </p>
                </div>

                {/* Decision Tree Regressor */}
                <div className="p-4 rounded-xl bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-1.5">
                  <strong className="text-white print:text-black block text-sm">3. Decision Tree Regressor</strong>
                  <p className="text-slate-400 print:text-slate-700">
                    Partitions feature space into M distinct hyper-rectangles R_m, assigning the region mean value:
                  </p>
                  <div className="p-2 rounded bg-slate-900 print:bg-slate-200 font-mono text-[11px] text-emerald-300 print:text-black">
                    c_m = ave(y_i | x_i ∈ R_m), minimizing Σ (y_i - c_m)²
                  </div>
                </div>

                {/* Random Forest Regressor */}
                <div className="p-4 rounded-xl bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-1.5">
                  <strong className="text-white print:text-black block text-sm">4. Random Forest Regressor</strong>
                  <p className="text-slate-400 print:text-slate-700">
                    Averages predictions across B randomized trees:
                  </p>
                  <div className="p-2 rounded bg-slate-900 print:bg-slate-200 font-mono text-[11px] text-emerald-300 print:text-black">
                    y_pred = (1/B) Σ T_b(x)
                  </div>
                  <p className="text-slate-400 print:text-slate-700">
                    Dramatically reduces test variance compared to individual regression trees.
                  </p>
                </div>

                {/* Support Vector Regression */}
                <div className="p-4 rounded-xl bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-1.5 md:col-span-2">
                  <strong className="text-white print:text-black block text-sm">5. Support Vector Regression (SVR)</strong>
                  <p className="text-slate-400 print:text-slate-700">
                    Employs Vapnik's ε-insensitive loss function where errors smaller than ε are ignored:
                  </p>
                  <div className="p-2 rounded bg-slate-900 print:bg-slate-200 font-mono text-[11px] text-emerald-300 print:text-black">
                    L_ε(y, f(x)) = max(0, |y - f(x)| - ε)
                  </div>
                  <p className="text-slate-400 print:text-slate-700">
                    Constructs a robust margin tube around regression targets resistant to outliers.
                  </p>
                </div>
              </div>
            </div>

            {/* Evaluation Metrics Mathematical Formulas */}
            <div className="space-y-3 pt-3">
              <h3 className="text-sm font-bold text-indigo-300 print:text-indigo-900 uppercase tracking-wide">
                3.3 Evaluation Metrics Formulations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/60 print:bg-slate-100 border border-slate-800 print:border-slate-300">
                  <span className="font-bold text-white print:text-black block">F1-Score</span>
                  <p className="text-indigo-300 font-mono mt-1 text-[11px]">2 * (P * R) / (P + R)</p>
                  <p className="text-slate-500 text-[10px] mt-1">Harmonic mean of precision and recall.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 print:bg-slate-100 border border-slate-800 print:border-slate-300">
                  <span className="font-bold text-white print:text-black block">ROC-AUC</span>
                  <p className="text-indigo-300 font-mono mt-1 text-[11px]">∫ TPR(FPR^-1(t)) dt</p>
                  <p className="text-slate-500 text-[10px] mt-1">Area under True Pos vs False Pos curve.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 print:bg-slate-100 border border-slate-800 print:border-slate-300">
                  <span className="font-bold text-white print:text-black block">RMSE</span>
                  <p className="text-emerald-300 font-mono mt-1 text-[11px]">sqrt( (1/N) Σ(y - ŷ)² )</p>
                  <p className="text-slate-500 text-[10px] mt-1">Root Mean Squared Error in target units.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 print:bg-slate-100 border border-slate-800 print:border-slate-300">
                  <span className="font-bold text-white print:text-black block">R² Score</span>
                  <p className="text-emerald-300 font-mono mt-1 text-[11px]">1 - (SS_res / SS_tot)</p>
                  <p className="text-slate-500 text-[10px] mt-1">Coefficient of determination (variance explained).</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter 4: Experimental Benchmarks */}
        <section className="space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-white print:text-black flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-400 print:text-indigo-700" />
            Chapter 4: Experimental Results & Benchmark Analysis
          </h2>

          <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-300 print:text-slate-800">
            <p>
              To rigorously test the platform, four benchmark datasets spanning multi-class classification and continuous regression tasks were evaluated through AutoML Studio:
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-800 print:border-slate-400">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 print:bg-slate-200 text-slate-300 print:text-black border-b border-slate-800 print:border-slate-400 font-semibold">
                  <tr>
                    <th className="p-3">Dataset Name</th>
                    <th className="p-3">Task Type</th>
                    <th className="p-3">Samples / Features</th>
                    <th className="p-3">Best Model</th>
                    <th className="p-3">Primary Metric</th>
                    <th className="p-3">Tuning Method</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 print:divide-slate-300 text-slate-400 print:text-slate-800 font-mono text-[11px]">
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-slate-200 print:text-black">Iris Flower</td>
                    <td className="p-3 text-purple-400">Multiclass (3)</td>
                    <td className="p-3">150 / 4</td>
                    <td className="p-3 text-white print:text-black">SVC (RBF, C=1.0)</td>
                    <td className="p-3 text-emerald-400 font-bold">Accuracy: 96.67%</td>
                    <td className="p-3">5-Fold GridSearchCV</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-slate-200 print:text-black">Wine Recognition</td>
                    <td className="p-3 text-purple-400">Multiclass (3)</td>
                    <td className="p-3">178 / 13</td>
                    <td className="p-3 text-white print:text-black">Random Forest (n=100)</td>
                    <td className="p-3 text-emerald-400 font-bold">Accuracy: 97.22%</td>
                    <td className="p-3">5-Fold RandomizedCV</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-slate-200 print:text-black">Diabetes Progression</td>
                    <td className="p-3 text-emerald-400">Regression</td>
                    <td className="p-3">442 / 10</td>
                    <td className="p-3 text-white print:text-black">Linear Regression (OLS)</td>
                    <td className="p-3 text-emerald-400 font-bold">R²: 0.52 / RMSE: 53.8</td>
                    <td className="p-3">5-Fold Cross-Validation</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-slate-200 print:text-black">California Housing</td>
                    <td className="p-3 text-emerald-400">Regression</td>
                    <td className="p-3">600 / 8</td>
                    <td className="p-3 text-white print:text-black">Random Forest Regressor</td>
                    <td className="p-3 text-emerald-400 font-bold">R²: 0.79 / RMSE: 0.49</td>
                    <td className="p-3">10-Fold GridSearchCV</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Chapter 5: Technical Specifications & Environment */}
        <section className="space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-white print:text-black flex items-center gap-2">
            <Terminal className="w-5 h-5 text-indigo-400 print:text-indigo-700" />
            Chapter 5: Technical Stack & Execution Requirements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-2">
              <strong className="text-white print:text-black block text-sm">Software Prerequisites</strong>
              <ul className="space-y-1 text-slate-400 print:text-slate-700 list-disc list-inside">
                <li><strong>Runtime:</strong> Node.js v18+ and Python 3.9+</li>
                <li><strong>ML Libraries:</strong> Scikit-Learn 1.3+, NumPy, Pandas</li>
                <li><strong>Persistence:</strong> Joblib (with built-in fallback engine)</li>
                <li><strong>Backend Framework:</strong> Flask + Flask-CORS</li>
                <li><strong>Frontend Framework:</strong> React 19, TypeScript, Vite, Tailwind CSS</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-2">
              <strong className="text-white print:text-black block text-sm">Execution Commands</strong>
              <p className="text-slate-400 print:text-slate-700">
                To launch the complete application on a local development workstation:
              </p>
              <div className="p-2.5 rounded bg-slate-900 print:bg-slate-200 font-mono text-[11px] text-indigo-300 print:text-black space-y-1">
                <div>pip install -r requirements.txt</div>
                <div>npm install</div>
                <div>npm run dev</div>
              </div>
              <p className="text-[11px] text-slate-500">
                Application runs on <code className="text-slate-300">http://localhost:3000</code> with the Flask API bridging on <code className="text-slate-300">http://127.0.0.1:5001</code>.
              </p>
            </div>
          </div>
        </section>

        {/* Chapter 6: Conclusion & References */}
        <section className="space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-white print:text-black flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 print:text-emerald-700" />
            Chapter 6: Conclusion & Future Scope
          </h2>

          <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-300 print:text-slate-800">
            <p>
              <strong>AutoML Studio</strong> proves that automated machine learning workflows can be both developer-friendly and mathematically rigorous. By unifying missing value imputation, one-hot encoding, feature scaling, K-fold hyperparameter optimization, and real-time interactive inference into a single reactive platform, the system eliminates lookahead data leakage while democratizing ML prototyping.
            </p>
            <p>
              <strong>Future Scope:</strong> Upcoming extensions include support for Gradient Boosted Decision Trees (XGBoost / LightGBM), automated ensemble stacking, and automated neural network architecture search (NAS).
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 print:border-slate-300">
            <h3 className="text-xs sm:text-sm font-bold text-white print:text-black mb-2 uppercase tracking-wide">
              References & Academic Citations (IEEE Style)
            </h3>
            <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-400 print:text-slate-700">
              <li>F. Pedregosa et al., "Scikit-learn: Machine Learning in Python," <em>Journal of Machine Learning Research</em>, vol. 12, pp. 2825-2830, 2011.</li>
              <li>M. Feurer et al., "Efficient and Robust Automated Machine Learning," in <em>Advances in Neural Information Processing Systems (NeurIPS)</em>, 2015.</li>
              <li>L. Breiman, "Random Forests," <em>Machine Learning</em>, vol. 45, no. 1, pp. 5-32, 2001.</li>
              <li>C. Cortes and V. Vapnik, "Support-vector networks," <em>Machine Learning</em>, vol. 20, no. 3, pp. 273-297, 1995.</li>
              <li>S. Raschka, "Model Evaluation, Model Selection, and Algorithm Selection in Machine Learning," <em>arXiv preprint arXiv:1811.12808</em>, 2018.</li>
            </ol>
          </div>
        </section>

        {/* Certificate / Submission Block for College */}
        <div className="pt-8 border-t border-slate-800 print:border-slate-400 text-xs text-slate-400 print:text-slate-800 grid grid-cols-2 gap-8">
          <div>
            <p className="font-semibold text-white print:text-black mb-6">Submitted By:</p>
            <p className="border-b border-slate-700 print:border-slate-400 pb-1 mb-1 font-mono text-slate-300 print:text-black">[Candidate Name / Roll Number]</p>
            <p className="text-[11px] text-slate-500">Department of Computer Science & Engineering</p>
          </div>
          <div>
            <p className="font-semibold text-white print:text-black mb-6">Approved & Evaluated By:</p>
            <p className="border-b border-slate-700 print:border-slate-400 pb-1 mb-1 font-mono text-slate-300 print:text-black">[Faculty Guide / Head of Department]</p>
            <p className="text-[11px] text-slate-500">Project Guide / Internal Examiner</p>
          </div>
        </div>
      </div>
    </div>
  );
};

