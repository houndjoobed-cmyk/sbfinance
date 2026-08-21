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
