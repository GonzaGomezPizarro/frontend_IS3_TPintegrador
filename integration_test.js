const { v4: uuidv4 } = require("uuid");

Feature("Integration Test");

Scenario("Create a user, refresh the list, and then delete the user", async ({ I }) => {

  //I.amOnPage("http://localhost:3000");
  I.amOnPage("https://frontend-776943981745.us-central1.run.app/")
  I.see("Trabajo Práctico Integrador");
  I.see("Utilizar una aplicación (desarrollo propio o de un proyecto en github)");
  I.see("Info");
  I.see("Users");
  I.see("Add User");

  I.wait(20);

  // Navegar a la página de creación de usuarios
  I.click("Add User");
  I.wait(1)

  // Intentar crear un usuario sin ingresar datos
  I.click("Create user");
  I.wait(1)
  I.see("Insert a username!");

  // Recortar el uuid para evitar problemas de longitud en la base de datos
  const username = `user_${uuidv4().substring(0, 8)}`;
  I.fillField("Username", username);
  I.click("Create user");
  I.wait(1)
  I.see("Insert a password!");

  // Crear un usuario correctamente
  I.fillField("Password", "password");
  I.click("Create user");
  I.wait(1)
  // Verificar si el usuario fue creado (feedback visual o redireccionamiento)
  I.see("User created successfully");

  // Navegar a la página de usuarios
  I.click("Users");
  I.wait(5)
  
  I.seeElement('[id="refresh-button"]');
  // Refrescar la lista de usuarios
  I.click('[id="refresh-button"]');
  I.wait(20);

  // Verificar que el nuevo usuario aparece en la lista
  I.see(username);

  // Eliminar el usuario recién creado
  I.click(`[id="delete-button-${username}"]`);
  I.wait(1)
  // Verificar el mensaje de éxito de la eliminación
  I.see("User deleted successfully");
});
