import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { Plus, Trash2, Check, Sparkles } from 'lucide-react-native';

interface Tarefa {
  id: string;
  texto: string;
  concluida: boolean;
}

export default function HomeScreen() {
  const [texto, setTexto] = useState('');
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  function adicionarTarefa() {
    if (texto.trim() === '') return;
    const novaTarefa: Tarefa = {
      id: Date.now().toString(),
      texto: texto.trim(),
      concluida: false,
    };
    setTarefas([...tarefas, novaTarefa]);
    setTexto('');
    Keyboard.dismiss();
  }

  function alternarConcluida(id: string) {
    setTarefas(tarefas.map(t =>
      t.id === id ? { ...t, concluida: !t.concluida } : t
    ));
  }

  function removerTarefa(id: string) {
    setTarefas(tarefas.filter(t => t.id !== id));
  }

  const concluidas = tarefas.filter(t => t.concluida).length;
  const total = tarefas.length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Lista de Tarefas</Text>
      </View>

      {total > 0 && (
        <View style={styles.progressoArea}>
          <Text style={styles.progressoTexto}>
            {concluidas} de {total} concluídas
          </Text>
          <View style={styles.barraFundo}>
            <View
              style={[
                styles.barraPreenchida,
                { width: `${(concluidas / total) * 100}%` },
              ]}
            />
          </View>
        </View>
      )}

      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma tarefa..."
          placeholderTextColor="#9aa5b5"
          value={texto}
          onChangeText={setTexto}
        />
        <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarTarefa} activeOpacity={0.8}>
          <Plus color="#fff" size={24} strokeWidth={3} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={tarefas}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={[styles.tarefaItem, item.concluida && styles.tarefaItemConcluida]}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => alternarConcluida(item.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkboxCirculo, item.concluida && styles.checkboxCirculoAtivo]}>
                {item.concluida && <Check color="#fff" size={14} strokeWidth={3} />}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tarefaTextoArea}
              onPress={() => alternarConcluida(item.id)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tarefaTexto, item.concluida && styles.concluida]}>
                {item.texto}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoRemover}
              onPress={() => removerTarefa(item.id)}
              activeOpacity={0.7}
            >
              <Trash2 color={AZUL_MARINHO} size={18} />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.vazioContainer}>
            <Text style={styles.listaVazia}>Nenhuma tarefa adicionada ainda.</Text>
          </View>
        }
      />
    </View>
  );
}

const AZUL_MARINHO = '#1e3a5f';
const AZUL_CLARO = '#4a7ab5';
const AZUL_FORTE = '#13294b';
const FUNDO = '#ffffff';
const CARTAO = '#f7f9fc';
const CARTAO_CONCLUIDA = '#98e4b1';
const BORDA = '#dde4ee';

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FUNDO,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: AZUL_MARINHO,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  progressoArea: {
    marginBottom: 20,
  },
  progressoTexto: {
    color: '#6b7c93',
    fontSize: 13,
    marginBottom: 6,
    textAlign: 'center',
  },
  barraFundo: {
    height: 6,
    backgroundColor: CARTAO,
    borderRadius: 3,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: BORDA,
  },
  barraPreenchida: {
    height: '100%',
    backgroundColor: AZUL_MARINHO,
    borderRadius: 3,
  },
  inputArea: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  input: {
    flex: 1,
    backgroundColor: CARTAO,
    borderWidth: 1,
    borderColor: BORDA,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1a1a1a',
  },
  botaoAdicionar: {
    backgroundColor: AZUL_MARINHO,
    borderRadius: 14,
    marginLeft: 10,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: AZUL_MARINHO,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  tarefaItem: {
    backgroundColor: CARTAO,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BORDA,
    shadowColor: '#1e3a5f',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  tarefaItemConcluida: {
    backgroundColor: CARTAO_CONCLUIDA,
    borderColor: '#e4e9f1',
  },
  checkbox: {
    marginRight: 12,
  },
  checkboxCirculo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: AZUL_MARINHO,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCirculoAtivo: {
    backgroundColor: AZUL_FORTE,
    borderColor: AZUL_FORTE,
  },
  tarefaTextoArea: {
    flex: 1,
  },
  tarefaTexto: {
    fontSize: 16,
    color: '#1f2937',
  },
  concluida: {
    textDecorationLine: 'line-through',
    color: '#9aa5b5',
  },
  botaoRemover: {
    padding: 6,
    marginLeft: 8,
  },
  vazioContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  vazioEmoji: {
    fontSize: 36,
    marginBottom: 10,
  },
  listaVazia: {
    textAlign: 'center',
    color: '#9aa5b5',
    fontSize: 16,
  },
});