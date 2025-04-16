from selenium import webdriver 
from selenium.webdriver.common.by import By 
from selenium.webdriver.chrome.service import Service 
from selenium.webdriver.support.ui import WebDriverWait 
from selenium.webdriver.support import expected_conditions as EC 
from webdriver_manager.chrome import ChromeDriverManager 
import time

# Inicializa o driver do chrome com o ChromeDriverManager para gerenciar a versão do driver
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install())) 
# Maximiza a janela do navegador para melhor visualização
driver.maximize_window() 

try: 
    # Define a URL de teste da página de login 
    url = "https://www.hankeds.com.br/prova/login.html" 
    # Navega para a URL definida
    driver.get(url) 
    # Espera 2 segundos para garantir que a página carregue completamente
    time.sleep(2) 
    
    # Função para simular digitação de caractere por caractere
    def digitar_lento(elemento, texto, delay=0.25): 
        for letra in texto: 
            elemento.send_keys(letra) 
            time.sleep(delay)
    
    # Localiza o campo de usuário e espera até que esteja presente (no máx 10 segundos)
    usuario = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "username")))
    # Localiza o campo de senha
    senha = driver.find_element(By.ID, "password") 
    # Localiza o botão de login usando XPath
    botao = driver.find_element(By.XPATH, "//button[contains(text(), 'Entrar')]") 
    
    # Digita o nome de usuário caractere por caractere
    digitar_lento(usuario, "admin") 
    time.sleep(1) 
    # Digita a senha caractere por caractere
    digitar_lento(senha, "admin123456") 
    time.sleep(1) 
    # Clica no botão de login
    botao.click() 
    # Espera 4 segundos para o redirecionamento 
    time.sleep(4)  
    
    # Verifica se o teste foi bem-sucedido verificando a URL atual
    if "destino.html" in driver.current_url: 
        print("Teste passou: redirecionado corretamente.") 
    else: 
        print("Teste falhou: redirecionamento não ocorreu.") 
    # Espera 5 segundos antes de encerrar o teste
    time.sleep(5) 
    
except Exception as e: 
    # Captura e imprime qualquer erro que ocorra durante o teste
    print("Erro durante o teste:", str(e)) 
    
finally: 
    # Garante que o navegador será fechado mesmo com erros
    driver.quit()