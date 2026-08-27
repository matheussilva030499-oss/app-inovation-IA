# Filebeat — Start, Stop e Status (Ubuntu)

Guia simples para controlar o serviço Filebeat na linha de comando.

---

## 1. STATUS — ver se está rodando
```bash
sudo systemctl status filebeat
```

Como ler:
- `active (running)` → ligado
- `inactive (dead)` → parado
- `failed` → erro ao iniciar

---

## 2. START — ligar
```bash
sudo systemctl start filebeat
sudo systemctl status filebeat
```

---

## 3. STOP — desligar
```bash
sudo systemctl stop filebeat
sudo systemctl status filebeat
```

---

## 4. RESTART — reiniciar
Use depois de alterar `/etc/filebeat/filebeat.yml`.
```bash
sudo systemctl restart filebeat
```

---

## 5. ENABLE / DISABLE — iniciar com o sistema
```bash
sudo systemctl enable filebeat
sudo systemctl disable filebeat
```

---

## 6. Ver logs (se der problema)
```bash
sudo journalctl -u filebeat -n 50 --no-pager
```

---

## Cola rápida
```bash
sudo systemctl status filebeat
sudo systemctl start filebeat
sudo systemctl stop filebeat
sudo systemctl restart filebeat
sudo systemctl enable filebeat
```

## Ordem no posto
1. `status` → ver se está rodando  
2. se parado → `start`  
3. se alterou config → `restart`  
4. se falhou → ver log com `journalctl`
