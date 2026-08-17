# Posicionamento Estratégico — Ofensores de Lentidão na Produção

| Campo | Conteúdo |
|---|---|
| **Documento** | REL-TI-PROD-001 |
| **Data** | ____/____/________ |
| **Público** | Gerência de Engenharia · Área Técnica · TI |

**Alinhamento entre TI, Área Técnica e Engenharia**

---

## 1. Objetivo desta apresentação

Deixar claro, para a gerência de Engenharia e da Área Técnica, quais são os reais ofensores de lentidão na linha — com impacto no resultado, responsabilidade e decisão necessária — evitando que a TI continue sendo tratada como causa padrão sem análise de causa raiz.

---

## 2. Mensagem central

A lentidão na produção, na maioria das ocorrências recentes, **não nasce de falha estrutural da TI**. Os ofensores recorrentes estão em configuração, desempenho de posto/equipamento, cabeamento e disciplina de processo.

Enquanto isso não for tratado de forma conjunta e com dono claro, o problema se repete, o apontamento continua caindo na TI e o tempo de correção aumenta.

---

## 3. Por que isso é estratégico

- Impacto direto em ritmo de linha, disponibilidade e produtividade
- Retrabalho operacional e desgaste entre áreas
- Diagnóstico lento quando a causa é apontada sem evidência
- Risco de decisões erradas (investir em TI quando o ofensor é processo/equipamento)
- Necessidade de governança: causa raiz → responsável → ação → prazo

---

## 4. Ofensores prioritários (visão gerencial)

| # | Ofensor | Impacto no negócio | Responsabilidade primária | Decisão necessária |
|---|---|---|---|---|
| 1 | RAPs com baixa eficiência | Perda de ciclo, fila e falsa percepção de “sistema lento” | Área Técnica / Engenharia | Definir spec mínima e plano de upgrade/substituição |
| 2 | Cabos Categoria 5 | Instabilidade de comunicação e paradas intermitentes | Área Técnica / Engenharia | Padronizar e substituir trechos críticos |
| 3 | Erro de configuração de roteiro | Parada imediata, retrabalho e atraso de liberação | Engenharia / Área Técnica | Controle de liberação (checklist + dupla verificação) |
| 4 | IP duplicado na linha | Queda de comunicação e interrupção crítica | Área Técnica / Engenharia | Plano de endereçamento e bloqueio de alteração informal |
| 5 | PCs com baixa memória/CPU | Travamento de posto e perda de produtividade | Área Técnica / Engenharia | Adequar hardware ao software/processo atual |
| 6 | Desorganização passou/não passou | Retrabalho, perda de rastreabilidade e tempo improdutivo | Engenharia / Área Técnica | Padronizar status e disciplina de apontamento |

---

## 5. Evidências (anexos)

| Anexo | Ofensor | Evidência |
|---|---|---|
| A | RAPs baixa eficiência | [ ] Print/foto |
| B | Cabos Cat5 | [ ] Print/foto |
| C | Erro de roteiro | [ ] Print/foto |
| D | IP duplicado | [ ] Print/foto |
| E | PCs baixa performance | [ ] Print/foto |
| F | Passou / não passou | [ ] Print/foto |

---

## 6. Papéis e responsabilidades

| Área | Papel estratégico |
|---|---|
| Engenharia | Garantir configuração correta de roteiro/modelo/postos e padronização de processo |
| Área Técnica | Garantir condição do posto (equipamento, cabo, IP, desempenho) e disciplina operacional |
| TI | Apoiar diagnóstico com evidência, mapear conflitos de rede/sistema e capacitar as áreas |

---

## 7. Compromisso da TI — Treinamento

A TI realizará treinamento direcionado à Área Técnica e Engenharia:

- Configuração de IP em RAPs (padronização e prevenção de IP duplicado)
- Configuração e uso do Filebeat (coleta/envio de logs e boas práticas)
- Checklist mínimo antes de classificar a ocorrência como “falha de TI”

**Data prevista:** ____/____/________  
**Responsável TI:** ____________________

---

## 8. Decisões solicitadas à gerência

- Reconhecer os ofensores acima como prioritários de Engenharia e Área Técnica
- Definir dono e prazo para cada ação do plano
- Adotar triagem por causa raiz (com evidência) antes de escalar para TI
- Apoiar o treinamento da TI e a padronização de IP/Filebeat nos postos

---

## 9. Plano de ação (acompanhamento gerencial)

| ID | Ação | Dono | Prazo | Status |
|---|---|---|---|---|
| PA-01 | Substituir/padronizar cabos Cat5 nos trechos críticos | Área Técnica / Engenharia | __/__/____ | Aberto |
| PA-02 | Eliminar IPs duplicados e oficializar endereçamento | Área Técnica / Engenharia | __/__/____ | Aberto |
| PA-03 | Implantar controle de liberação de roteiro | Engenharia / Área Técnica | __/__/____ | Aberto |
| PA-04 | Plano de adequação de RAPs/PCs abaixo da spec | Área Técnica / Engenharia | __/__/____ | Aberto |
| PA-05 | Padronizar status passou/não passou | Engenharia / Área Técnica | __/__/____ | Aberto |
| PA-06 | Executar treinamento TI (IP RAP + Filebeat + checklist) | TI | __/__/____ | Aberto |

---

## 10. Conclusão

Este não é um relatório operacional de chamado: é um posicionamento estratégico para alinhar as áreas. A TI continuará apoiando com diagnóstico e capacitação, mas a correção definitiva dos principais ofensores depende de decisão e execução da Engenharia e da Área Técnica.

---

## 11. Aprovações

| Área | Nome | Assinatura | Data |
|---|---|---|---|
| TI | | | __/__/____ |
| Área Técnica | | | __/__/____ |
| Engenharia | | | __/__/____ |
