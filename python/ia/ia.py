import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# Passo 1: Simulação de um dataset com tentativas de login
# Cada linha representa uma tentativa de login com variáveis para diferenciar atividades normais de ataques

np.random.seed(42)
num_rows = 1000

# Gerar dados simulados
dataset = pd.DataFrame({
    'num_attempts': np.random.randint(1, 20, size=num_rows),  # Número de tentativas consecutivas
    'time_between_attempts': np.random.rand(num_rows) * 5,  # Tempo entre tentativas (em segundos)
    'password_length': np.random.randint(6, 15, size=num_rows),  # Comprimento da senha usada
    'is_success': np.random.choice([0, 1], size=num_rows, p=[0.95, 0.05])  # Sucesso da tentativa
})

# Adicionando uma coluna 'label' para indicar o tipo de atividade (0 = normal, 1 = ataque)
# Força Bruta: Muitas tentativas, tempo curto entre elas, senha curta
# Ataque de Dicionário: Muitas tentativas, tempo médio, comprimento de senha comum
# Ataque Rainbow Table: Baixo número de tentativas, tempo aleatório, comprimento de senha similar

conditions = [
    (dataset['num_attempts'] > 10) & (dataset['time_between_attempts'] < 2) & (dataset['password_length'] < 8),
    (dataset['num_attempts'] > 5) & (dataset['time_between_attempts'] > 1) & (dataset['password_length'].isin([6, 8, 10])),
    (dataset['num_attempts'] < 5) & (dataset['time_between_attempts'] > 1) & (dataset['password_length'] > 10)
]
choices = [1, 1, 1]  # Marcando ataques como "1"
dataset['label'] = np.select(conditions, choices, default=0)  # 0 para tentativa normal

# Passo 2: Preparação dos dados para o modelo
X = dataset.drop('label', axis=1)  # Features
y = dataset['label']  # Rótulos (0: normal, 1: ataque)

# Dividir os dados em conjuntos de treino e teste
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Passo 3: Treinar o modelo de classificação
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# Passo 4: Avaliação do modelo
y_pred = clf.predict(X_test)
print(classification_report(y_test, y_pred))

# Exibir uma amostra dos dados e as previsões para entender o comportamento
dataset['prediction'] = clf.predict(X)
print(dataset[['num_attempts', 'time_between_attempts', 'password_length', 'is_success', 'label', 'prediction']].head(10))
