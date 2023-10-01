const burguerButton = document.querySelector('.burguer')
const navLinks = document.querySelector('.nav-links')
  

  burguerButton.addEventListener("click",() =>{
    const visibility = navLinks.getAttribute("data-visible");

    if (visibility === "false"){
      navLinks.setAttribute("data-visible", true)
      burguerButton.setAttribute("aria-expanded", true)
    } else if (visibility === "true"){
        navLinks.setAttribute("data-visible", false)
        burguerButton.setAttribute("aria-expanded", false)
    }
  })

  const observer = new IntersectionObserver((entries) => {     entries.forEach((entry) => {
    console.log(entry)
    if (entry.isIntersecting) {
        entry.target.classList.add('show');         }     }); });
const hiddenElements = document.querySelectorAll('.hidden'); hiddenElements.forEach((e1) => observer.observe(e1));


class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);
    if(this.form) {
      this.url = this.form.getAttribute("action");      
    }
    this.sendForm = this.sendForm.bind(this);
  }

  displaySuccess() {
    this.form.innerHTML = this.settings.success;
  }

  displayError() {
    this.form.innerHTML - this.settings.error;
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;
    });
    return formObject;
  }

  onSubmission(event) {
    event.target.disabled = true;
    event.target.innerText = "Enviando...";

  }

  async sendForm(event){
    try {
      this.onSubmission(event);
    await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(this.getFormObject()),
    });
    this.displaySuccess();
    } catch(error) {
      this.displayError();
      throw new Error(error);
    }
  }

  init() {
    if(this.form) this.formButton.addEventListener("click", this.sendForm);
    return this;
  }

}

const formSubmit = new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
  success: "<h1 class='success'>Mensagem enviada!<h1/>",
  error: "<h1 class='error'> Não foi possivel enviar.</h1>"
});

formSubmit.init();