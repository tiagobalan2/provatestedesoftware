const { Builder, By } = require("selenium-webdriver"); // Importando os módulos necessários do Selenium WebDriver

// declaro uma função assíncrona que executa o teste automatizado
(async function testeHanked() {
  // crio uma variável constante com a URL do site de login que será testado
  const url = "https://www.hankeds.com.br/prova/login2.html";
  // inicializo o navegador Chrome e armazeno a instância na variável driver para controlar as ações no navegador
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // inicio o bloco try/catch para tratar possíveis erros durante a execução
    await driver.get(url); // carrego a página de login na URL especificada
    await driver.sleep(2000); // aguardo 2 segundos para garantir que a página seja completamente carregada

    // localizo o campo de usuário pelo seu ID no HTML e armazeno na variável username
    const username = await driver.findElement(By.id("username"));
    // localizo o campo de senha pelo seu ID no HTML e armazeno na variável password
    const password = await driver.findElement(By.id("password"));

    // localizo o botão de login usando XPath, procurando um elemento button que contém o texto 'Entrar'
    const botao = await driver.findElement(
      By.xpath("//button[contains(text(),'Entrar')]")
    );

    // simulo a digitação humana do nome de usuário, inserindo uma letra por vez com pequenas pausas
    for (const letra of "admin") {
      await username.sendKeys(letra); // insiro uma letra no campo de usuário
      await driver.sleep(250); // pauso por 250ms para simular uma digitação realista
    }

    // aguardo 1 segundo antes de começar a digitar a senha
    await driver.sleep(1000);

    // simulo a digitação humana da senha, inserindo um caractere por vez com pequenas pausas
    for (const letra of "admin123456") {
      await password.sendKeys(letra); // insiro um caractere no campo de senha
      await driver.sleep(250); // pauso por 250ms para simular uma digitação realista
    }

    // aguardo 1 segundo antes de clicar no botão de login
    await driver.sleep(1000);
    await botao.click(); // clico no botão de login para submeter o formulário

    await driver.sleep(4000); // aguardo 4 segundos para o processamento do login e redirecionamento

    // capturo a URL atual após o login para verificar se houve redirecionamento
    const urlAtual = await driver.getCurrentUrl();

    // verifico se o login foi bem-sucedido através da verificação da URL de destino
    if (urlAtual.includes("destino2.html")) {
      // se a URL contém "destino.html", o login foi bem-sucedido
      console.log(" Teste passou: redirecionado corretamente."); // exibo mensagem de sucesso
    } else {
      // se não houve redirecionamento para a página de destino, o login falhou
      console.log(" Teste falhou: não houve redirecionamento."); // exibo mensagem de falha
    }

    await driver.sleep(5000); // aguardo 5 segundos antes de encerrar o teste para visualizar o resultado
  } catch (err) {
    // capturo e trato qualquer erro que possa ocorrer durante a execução do teste
    console.error(" Erro durante o teste:", err); // exibo detalhes do erro no console
  } finally {
    // este bloco sempre será executado, independentemente de sucesso ou falha
    await driver.quit(); // fecho o navegador e encerro a sessão do WebDriver
  }
})(); // executo a função assíncrona imediatamente após sua definição

// PUDE NOTAR QUE NESTE TESTE ELE IMPRIME PARA MIM 'TESTE FALHOU: NÃO HOUVE REDIRECIONAMENTO' POR CONTA DE NA URL ESTAR DESTINO2.HTML E NÃO DESTINO.HTML

// CORRIGINDO O CÓDIGO PARA ELE VER SE INCLUI DESTINO.HTML

// if (urlAtual.includes("destino.html")) {  PARA if (urlAtual.includes("destino2.html")) {
// ELE PRINTA PARA MIM Teste passou: redirecionado corretamente.
