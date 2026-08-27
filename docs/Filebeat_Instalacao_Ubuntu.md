# Passo a passo — Instalação do Filebeat (Ubuntu)

Documento didático para instalação via linha de comando.

## Regra de versão
- **Ubuntu 32 bits (i386)** → Filebeat **7.11.2**
- **Ubuntu 64 bits (amd64)** → Filebeat **8.11.4**

---

## 0. Antes de começar — descobrir se é 32 ou 64 bits

```bash
uname -m
```

- `i386` / `i686` → **32 bits** → use a **Parte A**
- `x86_64` / `amd64` → **64 bits** → use a **Parte B**

---

## Parte A — Instalação 32 bits (Filebeat 7.11.2)

### A1. Baixar o pacote
```bash
cd /tmp
curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.11.2-i386.deb
```

### A2. Instalar
```bash
sudo dpkg -i filebeat-7.11.2-i386.deb
```

Se aparecer erro de dependência:
```bash
sudo apt-get install -f -y
```

### A3. Conferir a versão
```bash
filebeat version
```
Deve aparecer **7.11.2**.

### A4. Habilitar no boot
```bash
sudo systemctl enable filebeat
```

### A5. Iniciar
```bash
sudo systemctl start filebeat
sudo systemctl status filebeat
```

---

## Parte B — Instalação 64 bits (Filebeat 8.11.4)

### B1. Baixar o pacote
```bash
cd /tmp
curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-8.11.4-amd64.deb
```

### B2. Instalar
```bash
sudo dpkg -i filebeat-8.11.4-amd64.deb
```

Se aparecer erro de dependência:
```bash
sudo apt-get install -f -y
```

### B3. Conferir a versão
```bash
filebeat version
```
Deve aparecer **8.11.4**.

### B4. Habilitar no boot
```bash
sudo systemctl enable filebeat
```

### B5. Iniciar
```bash
sudo systemctl start filebeat
sudo systemctl status filebeat
```

---

## Arquivo de configuração (ambos)
```bash
sudo nano /etc/filebeat/filebeat.yml
sudo systemctl restart filebeat
```

## Teste rápido
```bash
sudo filebeat test config
```

## Resumo
| Arquitetura | Versão | Pacote |
|---|---|---|
| 32 bits | 7.11.2 | `filebeat-7.11.2-i386.deb` |
| 64 bits | 8.11.4 | `filebeat-8.11.4-amd64.deb` |
