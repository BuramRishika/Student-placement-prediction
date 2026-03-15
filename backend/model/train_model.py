import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import pickle
import os

# Generate synthetic training data since dataset is minimal
np.random.seed(42)
n = 500

cgpa = np.round(np.random.uniform(4.0, 10.0, n), 2)
internships = np.random.randint(0, 5, n)
projects = np.random.randint(0, 8, n)
communication = np.random.randint(1, 11, n)
coding = np.random.randint(1, 11, n)

# Placement logic: higher scores = more likely placed
score = (cgpa / 10) * 0.35 + (internships / 4) * 0.2 + (projects / 7) * 0.15 + (communication / 10) * 0.15 + (coding / 10) * 0.15
placed = (score + np.random.normal(0, 0.05, n) > 0.5).astype(int)

df = pd.DataFrame({
    'cgpa': cgpa,
    'internships': internships,
    'projects': projects,
    'communication': communication,
    'coding': coding,
    'placed': placed
})

# Also load real dataset rows if available
try:
    real_df = pd.read_csv(os.path.join(os.path.dirname(__file__), '../../dataset/placement_dataset.csv'))
    df = pd.concat([df, real_df], ignore_index=True)
except Exception:
    pass

X = df[['cgpa', 'internships', 'projects', 'communication', 'coding']]
y = df['placed']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

accuracy = model.score(X_test, y_test)
print(f"Model accuracy: {accuracy:.2f}")

model_path = os.path.join(os.path.dirname(__file__), 'placement_model.pkl')
with open(model_path, 'wb') as f:
    pickle.dump(model, f)

print(f"Model saved to {model_path}")
