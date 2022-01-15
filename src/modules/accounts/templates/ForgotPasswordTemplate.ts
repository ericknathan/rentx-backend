interface ITemplate {
  name: string;
  link: string
}

function ForgotPasswordTemplate({ name, link }: ITemplate) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          .container {
            max-width: 800px;
            font-family: Arial, Helvetica, sans-serif;
            padding: 25px;
            background-color: #F4F5F6;
            margin: auto;
          }
          
          .container img {
            padding-bottom: 25px;
            margin-top: 10px;
          }
          
          .subcontainer {
            background-color: #f9f9f9;
            border: 1px solid #DBDBDB;
            padding: 20px 40px;
            color: #47474D;
          }
          
          .subcontainer h2 {
            font-weight: 400;
            color: #47474D;
          }
          
          .subcontainer button {
            background: #DC1637;
            padding: 15px 35px;
            color: #F4F5F6;
            text-decoration: none;
            font-weight: 500;
            border: none;
            font-weight: bold;
            margin: 10px 35%;
            cursor: pointer;
          }
          
          .bold {
            font-weight: bold;
          }
          
          span {
            margin: 10px 0;
            display: block;
          }
          
          h3 {
            font-weight: 400;
            text-align: end;
          }
        </style>

      </head>
      <body>
        <div class="container">
          <img src="https://i.imgur.com/oUAKMC5.png"/>
          <div class="subcontainer">
            <h2>Olá ${name},</h2>
        
            <br/>
        
            <span class="bold">Um pedido de recuperação de senha foi recebido para alterar a senha da sua conta Rentx.</span>
            <span>Para realizar a troca, clique no botão abaixo:</span>
            
            <button onclick="location.href='${link}'">Alterar Senha</button>
            <span>Caso não consiga clicar no botão acima, <a href="${link}">clique aqui</a>.</span>
        
            <span>Caso não tenha sido você quem solicitou a alteração da senha, basta ignorar este e-mail.</span>
          
            <h3>Obrigado, <br> Equipe Rentx</h3>
          </div>
        </div>
      </body>
    </html>
  `;
}

export { ForgotPasswordTemplate }