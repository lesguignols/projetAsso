module.exports.addAdherentErrors = (err) => {
    let errors = { card: "", name: "", firstName: "" };

    if (err.message.includes('card'))
        errors.card = "Carte invalide ou déjà utilisée.";
    if (err.code === 11000 && Object.keys(err.keyValue).includes('card'))
        errors.card = "Carte déjà utilisée."
    if (err.message.includes('name'))
        errors.name = "Le nom est incorrect."
    if (err.message.includes('firstName'))
        errors.firstName = "Le prénom est incorrect."

    return errors;
}

module.exports.signInErrors = (err) => {
    let errors = { card: '', code: '' }

    if (err.message.includes("email"))
        errors.email = "Carte inconnue.";

    if (err.message.includes('password'))
        errors.password = "Le mot de passe ne correspond pas."

    return errors;
}

module.exports.addPhotoErrors = (err) => {
    let errors = { format: '' };

    if (err.message.includes('invalid file'))
        errors.format = "Format incompatabile";

    return errors
}