# Relatório Técnico — Ofensores de Lentidão e Interrupções na Linha de Produção

| Campo | Conteúdo |
|---|---|
| **Documento** | REL-TI-PROD-001 |
| **Versão** | 0.1 (rascunho) |
| **Data** | ____/____/________ |
| **Elaborado por** | ________________________ (TI) |
| **Solicitado por** | ________________________ (Gerência) |
| **Áreas envolvidas** | TI · Engenharia · Produção · Manutenção |
| **Objetivo** | Identificar, evidenciar e classificar as principais causas de lentidão/interrupção nas linhas, separando ofensores de infraestrutura/TI de ofensores de processo, configuração e operação |

---

## 1. Objetivo

Este documento consolida os **principais ofensores** que impactam a performance e a disponibilidade das linhas de produção, com base em ocorrências recentes, evidências (prints/fotos) e análise técnica da equipe de TI.

O propósito é:

1. Organizar os problemas de forma objetiva (causa → impacto → evidência → responsável sugerido).
2. Reduzir o apontamento automático à TI sem análise prévia.
3. Facilitar o alinhamento entre TI e Engenharia quanto às ações corretivas e preventivas.
4. Servir como base para plano de ação e acompanhamento.

---

## 2. Escopo

### 2.1 Inclui
- Problemas de rede industrial e cabeamento
- Capacidade e desempenho de estações (PCs/RAPs)
- Erros de configuração de roteiro, modelo e postos
- Conflitos de IP / IPs duplicados
- Falhas de rastreabilidade (o que passou / não passou na linha)

### 2.2 Não inclui (nesta versão)
- Análise financeira de perdas
- Capacidade de fornecedores externos
- Mudanças de layout físico não relacionadas a TI/rede

---

## 3. Contexto

Recentemente, a operação tem enfrentado episódios de **lentidão e interrupções** nas linhas de produção. Em diversas ocorrências, a TI é acionada como ofensor principal **antes** da verificação completa da causa raiz.

Na prática, boa parte dos casos observados está associada a:

- Configurações de processo/roteiro incorretas ou incompletas
- Equipamentos/estações com desempenho insuficiente
- Infraestrutura de rede inadequada (ex.: cabos Cat5)
- Conflitos de endereço IP
- Falta de padronização no controle do que passou/não passou na linha

Este relatório organiza esses ofensores para discussão técnica entre as áreas.

---

## 4. Resumo executivo (visão rápida)

| # | Ofensor | Impacto típico | Área sugerida (primária) | Severidade* | Status |
|---|---|---|---|---|---|
| 1 | RAPs com baixa eficiência | Lentidão no posto / fila / timeout | Engenharia / Manutenção (com apoio TI) | Alta | Em análise |
| 2 | Uso de cabos Categoria 5 | Quedas, retransmissões, lentidão de rede | Engenharia / Infraestrutura / TI | Alta | Em análise |
| 3 | Erros frequentes de configuração de roteiro | Parada, retrabalho, apontamento indevido | Engenharia | Alta | Em análise |
| 4 | IP duplicado na linha / postos | Conflito de comunicação, perda de conexão | Engenharia / Produção (com apoio TI) | Crítica | Em análise |
| 5 | PCs com baixa memória/processamento | Travamentos, demora de tela/sistema | Engenharia / TI | Alta | Em análise |
| 6 | Desorganização do que passou/não passou | Retrabalho, perda de rastreabilidade, parada | Engenharia / Produção | Alta | Em análise |

\*Severidade sugerida: **Baixa / Média / Alta / Crítica** — ajustar após validação com produção.

---

## 5. Matriz de classificação (como usar este documento)

Para cada ocorrência, classificar:

| Dimensão | Pergunta-guia |
|---|---|
| **Sintoma** | O que o operador/linha sentiu? (lento, parado, erro, timeout) |
| **Causa observada** | O que foi encontrado na verificação? |
| **Evidência** | Print, foto, log, horário, posto, modelo |
| **Impacto** | Linha parada? Quantos postos? Tempo aproximado? |
| **Área responsável sugerida** | Quem detém a causa (não quem recebeu o chamado) |
| **Ação imediata** | Contorno aplicado |
| **Ação definitiva** | Correção permanente / prevenção |

> **Regra prática:** antes de classificar como “problema de TI”, validar se há erro de roteiro, IP duplicado, cabo inadequado, posto/PC degradado ou falha de rastreabilidade.

---

## 6. Ofensores detalhados

> **Como preencher:** em cada seção, substitua os campos `[...]`, anexe a evidência e complete a tabela de ocorrências. Mantenha tom factual (data, posto, linha, modelo, sintoma, causa).

---

### 6.1 RAPs com baixa eficiência

**Descrição**  
Estações/RAPs operando com desempenho abaixo do necessário para o ciclo da linha, gerando lentidão local que se propaga como “problema de sistema/rede”.

**Sintomas observados**
- Demora para carregar tela / confirmar operação
- Timeouts intermitentes
- Fila no posto mesmo com rede aparentemente estável

**Possíveis causas**
- Hardware desatualizado ou subdimensionado
- Processo/aplicação pesada para o equipamento
- Disco/memória saturados
- Falta de manutenção preventiva (limpeza, atualização, substituição)

**Impacto na produção**
- Redução de ritmo do posto
- Efeito cascata nos postos seguintes
- Chamados indevidos para TI (“sistema lento”)

**Área sugerida (primária):** Engenharia / Manutenção  
**Apoio:** TI (diagnóstico de desempenho, validação de rede/aplicação)

**Evidências**
- [ ] Print de desempenho (CPU/RAM/Disco) — *Anexo A.1*
- [ ] Foto do equipamento / etiqueta — *Anexo A.2*
- [ ] Registro de horário e posto — *Anexo A.3*

**Ocorrências registradas**

| Data | Linha/Posto | Modelo | Sintoma | Evidência | Observação |
|---|---|---|---|---|---|
| __/__/____ | | | | Anexo A.__ | |
| __/__/____ | | | | Anexo A.__ | |

**Ações sugeridas**
1. Inventariar RAPs críticos e medir baseline de desempenho.
2. Definir especificação mínima (CPU/RAM/Disco) por tipo de posto.
3. Plano de substituição ou upgrade dos equipamentos abaixo do padrão.
4. Checklist de verificação antes de abrir chamado como “falha de TI”.

---

### 6.2 Uso de cabos Categoria 5

**Descrição**  
Cabeamento Cat5 (ou cabos degradados/não padronizados) em trechos que exigem melhor categoria e integridade, causando perda de pacotes, retransmissão e lentidão.

**Sintomas observados**
- Quedas intermitentes de comunicação
- Lentidão “vai e volta”
- Posto perde conexão sem falha clara de software

**Possíveis causas**
- Cabo Cat5 em ambiente que demanda Cat5e/Cat6 (ou superior, conforme padrão da planta)
- Cabo danificado, crimpagem ruim, patch cord improvisado
- Mistura de padrões sem controle

**Impacto na produção**
- Interrupções recorrentes difíceis de reproduzir
- Tempo elevado de troubleshooting
- Percepção errada de “servidor/TI lento”

**Área sugerida (primária):** Engenharia / Infraestrutura de chão de fábrica  
**Apoio:** TI (teste de link, validação de porta/switch, evidência de erro de rede)

**Evidências**
- [ ] Foto do cabo / conector / marcação Cat5 — *Anexo B.1*
- [ ] Print de erros de interface / status do link — *Anexo B.2*
- [ ] Localização do trecho (linha/posto/armário) — *Anexo B.3*

**Ocorrências registradas**

| Data | Local | Trecho/Posto | Achado | Evidência | Observação |
|---|---|---|---|---|---|
| __/__/____ | | | Cabo Cat5 / danificado | Anexo B.__ | |
| __/__/____ | | | | Anexo B.__ | |

**Ações sugeridas**
1. Mapear trechos com Cat5 e priorizar substituição nos postos críticos.
2. Padronizar categoria mínima de cabo na linha.
3. Proibir improvisos de patch cord sem validação.
4. Incluir inspeção visual de cabo no checklist de primeiro atendimento.

---

### 6.3 Erros frequentes de configuração de roteiro

**Descrição**  
Falhas recorrentes na configuração de roteiro/modelo/postos (ex.: modelo errado, sequência incorreta, parâmetros inconsistentes, IPs de posto mal definidos no projeto), gerando parada e retrabalho.

**Sintomas observados**
- Posto não reconhece modelo
- Sequência de operação inconsistente
- Erro ao iniciar/avançar ordem
- Necessidade de “ajuste emergencial” durante o turno

**Exemplos de erros**
- Configuração de modelos incorreta ou incompleta
- Postos com parâmetros divergentes do layout real
- IPs de posto duplicados ou desalinhados no cadastro do roteiro
- Divergência entre engenharia de processo e configuração aplicada

**Impacto na produção**
- Parada imediata do fluxo
- Retrabalho de configuração sob pressão
- Escalada para TI sem ser causa raiz de infraestrutura

**Área sugerida (primária):** Engenharia  
**Apoio:** TI (quando houver componente de rede/sistema); Produção (validação em linha)

**Evidências**
- [ ] Print da configuração do roteiro/modelo — *Anexo C.1*
- [ ] Print do erro apresentado no posto — *Anexo C.2*
- [ ] Comparativo “configurado x esperado” — *Anexo C.3*

**Ocorrências registradas**

| Data | Linha | Modelo | Tipo de erro | Quem configurou | Evidência | Observação |
|---|---|---|---|---|---|---|
| __/__/____ | | | Modelo / posto / IP no roteiro | | Anexo C.__ | |
| __/__/____ | | | | | Anexo C.__ | |

**Ações sugeridas**
1. Checklist obrigatório de liberação de roteiro (modelo, postos, IPs, sequência).
2. Dupla verificação (quatro olhos) antes de liberar para produção.
3. Histórico versionado de alterações de roteiro (quem, quando, o quê).
4. Treinamento/reciclagem para quem publica configuração.

---

### 6.4 IP duplicado na linha

**Descrição**  
Dois ou mais dispositivos/postos utilizando o mesmo endereço IP, gerando conflito de comunicação e comportamento intermitente (um sobe, outro cai).

**Sintomas observados**
- Posto “some” da rede periodicamente
- Comunicação instável entre estações
- Erros de conexão sem padrão claro
- Após reinício, o problema “troca de posto”

**Possíveis causas**
- Cadastro manual incorreto
- Clone de imagem/máquina sem alteração de IP
- Divergência entre plano de endereçamento e chão de fábrica
- IP fixo conflitando com outro dispositivo

**Impacto na produção**
- Parada crítica de comunicação
- Diagnóstico demorado
- Alto risco de reincidência se não houver controle de IP

**Área sugerida (primária):** Engenharia / Produção (cadastro e padronização de posto)  
**Apoio:** TI (detecção de conflito, mapa de rede, reserva de faixa)

**Evidências**
- [ ] Print/identificação do conflito de IP — *Anexo D.1*
- [ ] Foto/etiqueta dos postos envolvidos — *Anexo D.2*
- [ ] Trecho do plano de endereçamento — *Anexo D.3*

**Ocorrências registradas**

| Data | Linha | IP conflitante | Dispositivos/postos | Evidência | Observação |
|---|---|---|---|---|---|
| __/__/____ | | | | Anexo D.__ | |
| __/__/____ | | | | Anexo D.__ | |

**Ações sugeridas**
1. Plano de endereçamento oficial por linha/posto (documento vivo).
2. Proibir alteração de IP sem registro e aprovação.
3. Validação de IP único no checklist de setup de posto.
4. Procedimento de resposta rápida para conflito (isolamento + correção + registro).

---

### 6.5 PCs com baixa eficiência de memória e processamento

**Descrição**  
Computadores de posto com CPU/RAM insuficientes ou saturados, causando lentidão de aplicação, travamentos e percepção de “sistema fora”.

**Sintomas observados**
- Tela demorando para responder
- Travamento ao abrir múltiplas rotinas
- Uso contínuo elevado de memória/CPU
- Necessidade de reinício frequente

**Possíveis causas**
- Hardware abaixo da especificação do software atual
- Muitos processos em paralelo
- Disco lento / sem espaço
- Falta de padronização de imagem/configuração

**Impacto na produção**
- Perda de ciclo no posto
- Aumento de chamados genéricos de lentidão
- Confusão entre “rede lenta” e “máquina lenta”

**Área sugerida (primária):** Engenharia (especificação do posto) + TI (padronização/imagem/diagnóstico)

**Evidências**
- [ ] Print de Gerenciador de Tarefas / uso de RAM-CPU — *Anexo E.1*
- [ ] Especificação do equipamento — *Anexo E.2*
- [ ] Horário do incidente e posto — *Anexo E.3*

**Ocorrências registradas**

| Data | Posto | Spec (RAM/CPU) | Uso observado | Evidência | Observação |
|---|---|---|---|---|---|
| __/__/____ | | | CPU __% / RAM __% | Anexo E.__ | |
| __/__/____ | | | | Anexo E.__ | |

**Ações sugeridas**
1. Definir especificação mínima por tipo de posto.
2. Substituir/upgradear máquinas fora do padrão.
3. Padronizar imagem e softwares autorizados no posto.
4. Incluir coleta de evidência de desempenho no primeiro atendimento.

---

### 6.6 Desorganização do que passou / não passou na linha

**Descrição**  
Falta de clareza operacional e sistêmica sobre unidades aprovadas, rejeitadas, retrabalhadas ou pendentes, gerando retrabalho, discussões entre áreas e interrupções.

**Sintomas observados**
- Dúvida se a peça/ordem já passou no posto
- Retrabalho por falta de status confiável
- Acúmulo de material sem rastreio claro
- Paradas para “conferência manual”

**Possíveis causas**
- Processo de apontamento inconsistente
- Falha de disciplina operacional
- Configuração de fluxo/roteiro incompleta
- Falta de indicador visual/sistêmico confiável no posto

**Impacto na produção**
- Perda de ritmo
- Risco de qualidade/rastreabilidade
- Tempo gasto em investigação em vez de produzir

**Área sugerida (primária):** Engenharia / Produção  
**Apoio:** TI (quando houver falha real de sistema/registro)

**Evidências**
- [ ] Print de status divergente — *Anexo F.1*
- [ ] Foto da condição na linha — *Anexo F.2*
- [ ] Relato do turno (o que foi feito x o que o sistema mostra) — *Anexo F.3*

**Ocorrências registradas**

| Data | Linha | Ordem/Série | Divergência | Evidência | Observação |
|---|---|---|---|---|---|
| __/__/____ | | | Passou / não passou | Anexo F.__ | |
| __/__/____ | | | | Anexo F.__ | |

**Ações sugeridas**
1. Padronizar regra de status (aprovado / rejeitado / retrabalho / pendente).
2. Checklist de conferência por turno.
3. Treinamento de apontamento correto no posto.
4. Revisão de fluxo sistêmico com Engenharia + Produção (+ TI se necessário).

---

## 7. Fluxo sugerido de atendimento (para reduzir empasse)

```text
1. Sintoma na linha
        |
        v
2. Coleta mínima de evidência
   (posto, horário, modelo, print/foto, IP, cabo, sintoma exato)
        |
        v
3. Triagem rápida (checklist)
   [ ] Erro de roteiro/modelo/postos?
   [ ] IP duplicado / conflito?
   [ ] Cabo inadequado/danificado?
   [ ] PC/RAP com CPU-RAM saturados?
   [ ] Status passou/não passou inconsistente?
   [ ] Indício real de falha de rede/servidor/TI?
        |
        v
4. Encaminhamento pela causa raiz
   Engenharia / Produção / Manutenção / TI
        |
        v
5. Registro no relatório + ação corretiva + dono + prazo
```

---

## 8. Checklist de primeira verificação (anexar no chamado)

- [ ] Linha / posto / horário registrados
- [ ] Modelo / ordem em execução identificados
- [ ] Print do erro ou da tela lenta
- [ ] Verificado se há alteração recente de roteiro/modelo
- [ ] Verificado IP do posto (e possível duplicidade)
- [ ] Inspeção visual do cabo/conectores
- [ ] Evidência de desempenho do PC/RAP (CPU/RAM)
- [ ] Conferido status de passou/não passou
- [ ] Causa preliminar classificada
- [ ] Área responsável sugerida

---

## 9. Plano de ação consolidado (modelo)

| ID | Ofensor | Ação | Responsável | Apoio | Prazo | Status | Evidência de conclusão |
|---|---|---|---|---|---|---|---|
| PA-01 | Cabos Cat5 | Substituir trechos críticos por padrão definido | | | __/__/____ | Aberto | |
| PA-02 | IP duplicado | Publicar plano de endereçamento e controle de mudança | | | __/__/____ | Aberto | |
| PA-03 | Roteiro | Checklist de liberação + dupla verificação | | | __/__/____ | Aberto | |
| PA-04 | RAP/PC | Definir spec mínima e plano de upgrade | | | __/__/____ | Aberto | |
| PA-05 | Rastreabilidade | Padronizar status passou/não passou | | | __/__/____ | Aberto | |

---

## 10. Anexos (índice de evidências)

> Renomeie os arquivos de forma padronizada, por exemplo: `A1_rap_cpu_2026-08-15_linha2_posto3.png`

| Anexo | Descrição | Arquivo | Data | Relacionado a |
|---|---|---|---|---|
| A.1 | | | | 6.1 RAPs |
| A.2 | | | | 6.1 RAPs |
| B.1 | | | | 6.2 Cabos Cat5 |
| B.2 | | | | 6.2 Cabos Cat5 |
| C.1 | | | | 6.3 Roteiro |
| D.1 | | | | 6.4 IP duplicado |
| E.1 | | | | 6.5 PCs |
| F.1 | | | | 6.6 Passou/não passou |

---

## 11. Conclusão (texto-base — ajustar após evidências)

Com base nas ocorrências analisadas até o momento, a lentidão e as interrupções nas linhas **não se concentram em um único fator de TI**. Os ofensores recorrentes observados envolvem sobretudo:

1. Desempenho insuficiente de RAPs/PCs  
2. Cabeamento abaixo do padrão (Cat5 / degradação)  
3. Erros de configuração de roteiro/modelo/postos  
4. Conflitos de IP  
5. Falhas de organização/rastreabilidade do que passou ou não passou  

Recomenda-se adotar o fluxo de triagem deste documento, com evidência mínima obrigatória, para direcionar cada ocorrência à área correta e acelerar a correção definitiva.

---

## 12. Aprovações

| Papel | Nome | Assinatura | Data |
|---|---|---|---|
| Elaborador (TI) | | | __/__/____ |
| Gerência solicitante | | | __/__/____ |
| Engenharia | | | __/__/____ |
| Produção | | | __/__/____ |

---

## Apêndice — Modelo curto de registro de ocorrência (copiar por incidente)

```text
OCORRÊNCIA Nº: ________
Data/Hora: ____/____/________  __:__
Linha/Posto: ____________________
Modelo/Ordem: ____________________
Sintoma: ____________________
Evidências anexadas: ____________________

Triagem:
[ ] Roteiro/modelo/postos
[ ] IP duplicado
[ ] Cabo Cat5/danificado
[ ] RAP/PC com baixa performance
[ ] Status passou/não passou
[ ] Infraestrutura/servidor/TI

Causa preliminar: ____________________
Área responsável sugerida: ____________________
Ação imediata: ____________________
Ação definitiva: ____________________
Responsável + prazo: ____________________
```
