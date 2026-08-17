# Relatório Técnico — Ofensores de Lentidão na Linha de Produção

| Campo | Conteúdo |
|---|---|
| **Documento** | REL-TI-PROD-001 |
| **Data** | ____/____/________ |
| **Áreas envolvidas** | TI · Área Técnica · Engenharia |

**Objetivo:** apontar os principais erros e motivos que geram lentidão/interrupção nas linhas, com evidências e área responsável.

---

## 1. Objetivo

Apontar os principais erros e motivos que geram lentidão/interrupção nas linhas de produção, com evidências e área responsável, para alinhar TI, Área Técnica e Engenharia.

---

## 2. Contexto

A TI tem sido acionada como ofensor principal em várias ocorrências, muitas vezes sem verificação completa da causa raiz. Na prática, boa parte dos problemas está ligada a configuração, equipamento e cabeamento — e não à infraestrutura de TI em si.

---

## 3. Principais ofensores (visão para apresentação)

| # | Problema / Ofensor | Por que causa lentidão | Área responsável |
|---|---|---|---|
| 1 | RAPs com baixa eficiência | Posto lento, timeout e fila no ciclo da linha | Área Técnica / Engenharia |
| 2 | Cabos Categoria 5 | Queda de link, retransmissão e comunicação instável | Área Técnica / Engenharia |
| 3 | Erro de configuração de roteiro | Modelo/postos/IPs errados param ou travam o fluxo | Engenharia / Área Técnica |
| 4 | IP duplicado na linha | Conflito de rede: posto some ou perde conexão | Área Técnica / Engenharia |
| 5 | PCs com baixa memória/CPU | Travamento e demora na tela/aplicação do posto | Área Técnica / Engenharia |
| 6 | Desorganização do que passou/não passou | Retrabalho, parada para conferência e perda de ritmo | Engenharia / Área Técnica |

---

## 4. Detalhamento dos ofensores

### 4.1 RAPs com baixa eficiência
Hardware/desempenho abaixo do necessário para o ciclo.  
**Sintomas:** demora para carregar/confirmar · timeouts · fila no posto  
**Responsável:** Área Técnica / Engenharia — apoio TI no diagnóstico  
**Evidência:** [ ] Print/foto — Anexo A

### 4.2 Uso de cabos Categoria 5
Cabo inadequado ou degradado gera perda de pacotes e lentidão de rede.  
**Sintomas:** quedas intermitentes · lentidão “vai e volta” · posto perde conexão  
**Responsável:** Área Técnica / Engenharia — apoio TI na validação de link  
**Evidência:** [ ] Print/foto — Anexo B

### 4.3 Erros de configuração de roteiro
Configuração incorreta de modelo, postos ou IPs no roteiro.  
**Sintomas:** modelo não reconhecido · sequência inconsistente · ajuste emergencial no turno  
**Responsável:** Engenharia / Área Técnica  
**Evidência:** [ ] Print/foto — Anexo C

### 4.4 IP duplicado na linha
Dois dispositivos com o mesmo IP geram conflito de comunicação.  
**Sintomas:** posto some da rede · erro intermitente · problema “troca de posto” após reinício  
**Responsável:** Área Técnica / Engenharia — apoio TI na detecção  
**Evidência:** [ ] Print/foto — Anexo D

### 4.5 PCs com baixa memória e processamento
Estação saturada (RAM/CPU) causa travamento e lentidão.  
**Sintomas:** tela lenta · reinício frequente · confusão com “rede lenta”  
**Responsável:** Área Técnica / Engenharia — apoio TI no diagnóstico  
**Evidência:** [ ] Print/foto — Anexo E

### 4.6 Desorganização do que passou / não passou
Falta de controle claro do status gera retrabalho e parada.  
**Sintomas:** dúvida se já passou · conferência manual · risco de rastreabilidade  
**Responsável:** Engenharia / Área Técnica  
**Evidência:** [ ] Print/foto — Anexo F

---

## 5. Ação da TI — Treinamento

A TI irá realizar treinamento dos pontos críticos de configuração e operação, para reduzir reincidência e chamados indevidos. Escopo inicial:

- Configuração de IP em RAPs (padronização, validação e prevenção de IP duplicado)
- Configuração e uso do Filebeat (coleta/envio de logs e boas práticas)
- Checklist básico de verificação antes de escalar ocorrência como “falha de TI”

**Público sugerido:** Área Técnica e Engenharia  
**Data prevista:** ____/____/________  
**Responsável TI:** ____________________

---

## 6. Plano de ação resumido

| ID | Ação | Responsável | Prazo | Status |
|---|---|---|---|---|
| PA-01 | Corrigir/substituir cabos Cat5 nos trechos críticos | Área Técnica / Engenharia | __/__/____ | Aberto |
| PA-02 | Eliminar IPs duplicados e padronizar endereçamento | Área Técnica / Engenharia | __/__/____ | Aberto |
| PA-03 | Revisar e validar configurações de roteiro antes da liberação | Engenharia / Área Técnica | __/__/____ | Aberto |
| PA-04 | Avaliar/upgrade de RAPs e PCs com baixa performance | Área Técnica / Engenharia | __/__/____ | Aberto |
| PA-05 | Padronizar controle do que passou/não passou | Engenharia / Área Técnica | __/__/____ | Aberto |
| PA-06 | Treinamento TI: IP de RAP + Filebeat + checklist | TI | __/__/____ | Aberto |

---

## 7. Conclusão

A lentidão na produção não se resume a “problema de TI”. Os ofensores principais observados são desempenho de RAP/PC, cabo Cat5, erro de roteiro, IP duplicado e falha de organização do fluxo. A TI apoiará no diagnóstico e no treinamento; a correção definitiva depende principalmente da Área Técnica e da Engenharia.

---

## 8. Aprovações

| Área | Nome | Assinatura | Data |
|---|---|---|---|
| TI | | | __/__/____ |
| Área Técnica | | | __/__/____ |
| Engenharia | | | __/__/____ |

---

## 9. Anexos (evidências)

| Anexo | Ofensor | Arquivo / descrição |
|---|---|---|
| A | RAPs baixa eficiência | |
| B | Cabos Cat5 | |
| C | Erro de roteiro | |
| D | IP duplicado | |
| E | PCs baixa performance | |
| F | Passou / não passou | |
