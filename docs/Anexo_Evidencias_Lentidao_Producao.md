# Anexo de Evidências — Ofensores de Lentidão na Produção

| Campo | Conteúdo |
|---|---|
| **Documento** | REL-TI-PROD-001-ANEXO |
| **Data** | ____/____/________ |
| **Público** | Gerência de Engenharia · Área Técnica · TI |

## Índice

| # | Evidência | Ofensor | Área |
|---|---|---|---|
| 1 | Cabo RJ45 sem presilha | Queda de rede da RASP | Área Técnica / Engenharia |
| 2 | RJ45 oxidado / degradado | Instabilidade de comunicação | Área Técnica / Engenharia |
| 3 | Utilização de cabo Cat.5 / Cat.5e | Cabeamento abaixo do padrão | Área Técnica / Engenharia |
| 4 | RASP pendurada pelos cabos | Falta de disciplina de instalação | Área Técnica / Engenharia |
| 5 | Modelo mal configurado no roteiro | Erro de configuração de processo | Engenharia / Área Técnica |
| 6 | Falha recorrente de modelo/linha | Erro de configuração de processo | Engenharia / Área Técnica |
| 7 | RASP TCL006 — CPU saturada | Baixa eficiência de processamento | Área Técnica / Engenharia |
| 8 | RASP TCL007 — CPU saturada | Baixa eficiência de processamento | Área Técnica / Engenharia |

## Evidência 1 — Cabo RJ45 sem presilha
**Palavra-chave:** Estabilidade de comunicação  
**Achado:** Conector sem presilha de travamento → cabo solta com vibração.  
**Impacto:** Queda de rede da RASP e falsa percepção de falha de TI.  
**Área:** Área Técnica / Engenharia  
**Imagem:** `docs/evidencias/01_cabo_sem_presilha.jpg`

## Evidência 2 — RJ45 oxidado / degradado
**Palavra-chave:** Padronização de posto  
**Achado:** Conector oxidado/degradado compromete contato.  
**Impacto:** Instabilidade e lentidão de comunicação.  
**Área:** Área Técnica / Engenharia  
**Imagem:** `docs/evidencias/02_rj45_oxidado.jpg`

## Evidência 3 — Cabo Cat.5 / Cat.5e
**Palavra-chave:** Padronização de infraestrutura  
**Achado:** Cabo identificado como CAT.5E em uso.  
**Impacto:** Menor robustez de link e contribuição para instabilidade.  
**Área:** Área Técnica / Engenharia  
**Imagem:** `docs/evidencias/03_cabo_cat5.jpg`

## Evidência 4 — RASP pendurada pelos cabos
**Palavra-chave:** Disciplina de processo  
**Achado:** RASP sustentada pelos cabos, sem fixação adequada.  
**Impacto:** Risco de dano, desconexão e parada do posto.  
**Área:** Área Técnica / Engenharia  
**Imagem:** `docs/evidencias/04_rasp_pendurada.jpg`

## Evidência 5 — Modelo mal configurado no roteiro
**Palavra-chave:** Configuração na origem  
**Achado:** Bases coletam, mas modelo do roteiro diverge das placas da linha.  
**Impacto:** FAIL em série e parada de fluxo.  
**Área:** Engenharia / Área Técnica  
**Imagem:** `docs/evidencias/05_modelo_roteiro.jpg`

## Evidência 6 — Falha recorrente serial x produto
**Palavra-chave:** Liberação com responsabilidade  
**Achado:** Logs com FAIL: serial não pertence ao produto cadastrado na linha.  
**Impacto:** Reincidência do erro de configuração/roteiro.  
**Área:** Engenharia / Área Técnica  
**Imagem:** `docs/evidencias/06_logs_fail_modelo.jpg`

## Evidência 7 — RASP TCL006 (CPU saturada)
**Palavra-chave:** Desempenho do posto  
**Achado:** htop em tcl006 com CPU em 100% (processo Python). Memória com folga nesta captura.  
**Impacto:** Lentidão do posto atribuída indevidamente à TI.  
**Área:** Área Técnica / Engenharia  
**Imagem:** `docs/evidencias/07_htop_tcl006.jpg`

## Evidência 8 — RASP TCL007 (CPU saturada)
**Palavra-chave:** Desempenho do posto  
**Achado:** htop em tcl007 com CPU em 100% (processo Python). Padrão repetido.  
**Impacto:** Confirma ofensor de desempenho em mais de um posto.  
**Área:** Área Técnica / Engenharia  
**Imagem:** `docs/evidencias/08_htop_tcl007.jpg`

## Conclusão
As evidências reforçam: causa raiz em posto, cabeamento e configuração. TI apoia diagnóstico e capacitação; correção definitiva é de Engenharia e Área Técnica.
