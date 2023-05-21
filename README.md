 # App de Frequência cursinho Logos

## Descrição
O aplicativo de frequência é uma solução para gerenciar a presença de usuários em um ambiente específico. Ele utiliza QR code para validar a frequência dos alunos, fornecendo recursos como criação de usuários, listagem e pesquisa de usuários, visualização de informações de usuário, geração de QR codes para validação de frequência, opções de edição de informações de nome e CPF do usuário, exclusão de usuário, justificação de falta e exportação de relatório de presença em formato de planilha.

## Recursos Principais
- Criação de Usuário: Permite criar um novo usuário no sistema, fornecendo informações como nome e CPF.
- Listagem e Pesquisa de Usuários: Permite visualizar uma lista de usuários cadastrados e pesquisar usuários específicos com base em critérios como nome ou CPF.
- Visualização de Informações de Usuário: Exibe as informações detalhadas de um usuário, incluindo nome, CPF e histórico de frequência.
- Geração de QR Code: Permite gerar um QR code exclusivo para cada usuário, que pode ser escaneado para validar a presença.
- Edição de Informações de Usuário: Permite editar as informações de nome e CPF de um usuário existente.
- Exclusão de Usuário: Permite remover um usuário do sistema.
- Justificativa de Falta: Oferece a opção de justificar uma falta de um usuário, fornecendo uma razão ou explicação.
- Exportação de Relatório de Presença: Permite exportar um relatório em formato de planilha contendo a lista de presença de um mês inteiro ou de uma data específica.

## Tecnologias Utilizadas
O projeto utiliza as seguintes tecnologias:

- Expo: Plataforma para desenvolvimento de aplicativos móveis multiplataforma.
- React Native: Framework para construção de interfaces de usuário nativas em dispositivos móveis.
- Barcode scanner: Biblioteca para leitura de QR codes.
- Sharing: Biblioteca para o envio de arquivos como a imagem de qrCode do aluno.
- Filesystem: Biblioteca para guardar arquivos temporariamente antes de enviar.
- GeoLib e Expo location: Bibliotecas para verificar se quem está validando as frequencias está no espaço do curso.
- Navigation stack e tab: Bibliotecas para a navegação entre telas no app.
- Api feita em Java com spring boot.

## Fluxo de Funcionamento
A seguir, descrevemos o fluxo de funcionamento básico do aplicativo:
1. O responsável só podera usar o app dentro do espaço do cursinho.
2. O usuário abre o aplicativo e é apresentado com a tela inicial.
3. O usuário pode criar um novo usuário, informando o nome e CPF.
4. Na tela de feed, o usuário pode visualizar uma lista de todos os usuários cadastrados.
5. O usuário pode pesquisar por um usuário específico usando critérios como nome ou CPF.
6. Ao selecionar um usuário, o aplicativo exibe informações detalhadas sobre o mesmo, incluindo seu nome, CPF e histórico de frequência.
7. O usuário pode gerar um QR code exclusivo para o usuário selecionado.
8. O usuário pode editar as informações de nome e CPF do usuário.
9. O usuário tem a opção de excluir o usuário do sistema.
10. Caso ocorra uma falta, o usuário pode justificar a falta, fornecendo o cpf do aluno e a data da falta.
11. O usuário pode exportar um relatório de presença em formato de planilha, seja para um mês inteiro ou para uma data específica.
##
##
##
## Links
  - Repositório: https://github.com/Vicente-ferrer/QRcodeReader
  - Repositório da Api: https://github.com/ValterGabriell/FrequenciaAlunos_UFPALogos
    - se você encontrar algum bug ou vulnerabilidade no código, sinta-se à vontade para enviar um e-mail para vinciferrer78@gmail.com Ficarei feliz se você tiver alguma contribuição ou dica também
  ## Versão

  1.0.0.0

##
##
## Autor

<div style="background-color: black; display: flex; justify-content: flex-start; align-items: center; padding: 10px;">
  <img src="https://avatars.githubusercontent.com/u/61233984?v=4" alt="Foto do Autor" width="150" style="border-radius: 60%; margin-right: 10px;" />
  <div>
    <p>Vicente de Sousa</p>
    <p>GitHub:(https://github.com/Vicente-ferrer)</p>
    <p>LinkedIn:(https://www.linkedin.com/in/vicente-ferreira-7b73951a2)</p>
    <p>Instagram:(https://www.instagram.com/vicentesousa__/)</p>
    
  </div>
</div>
