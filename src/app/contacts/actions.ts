"use server";

import prisma from "@/lib/prisma";

export async function submitContactForm(formData: FormData) {
  try {
    const nom = formData.get("name") as string;
    const telephone = formData.get("phone") as string;
    const email = formData.get("email") as string | null;
    const agenceId = formData.get("agency") as string | null;
    const message = formData.get("message") as string;

    if (!nom || !telephone || !message) {
      return { success: false, error: "Veuillez remplir tous les champs obligatoires." };
    }

    await prisma.demandeContact.create({
      data: {
        nom,
        telephone,
        email: email || null,
        message,
        agencePreference: agenceId || null,
        estTraite: false
      }
    });

    // Optionnel: Ajouter l'envoi d'un email avec Resend ici

    return { success: true };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, error: "Une erreur est survenue lors de l'envoi de votre demande." };
  }
}

export async function submitReclamationForm(formData: FormData) {
  try {
    const objet = formData.get("objet") as string;
    const nom = formData.get("nom_prenom") as string;
    const telephone = formData.get("contact") as string;
    const email = formData.get("email") as string | null;
    const revendication = formData.get("revendication") as string;

    if (!objet || !nom || !telephone || !revendication) {
      return { success: false, error: "Veuillez remplir tous les champs obligatoires." };
    }

    // Format the message to include the subject and mark it clearly as a reclamation
    const formattedMessage = `[RÉCLAMATION]\nObjet : ${objet}\n\nDétails :\n${revendication}`;

    // We store it in the DemandeContact table so it shows up in the admin dashboard
    await prisma.demandeContact.create({
      data: {
        nom,
        telephone,
        email: email || null,
        message: formattedMessage,
        estTraite: false
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Error submitting reclamation form:", error);
    return { success: false, error: "Une erreur est survenue lors de l'envoi de votre réclamation." };
  }
}
