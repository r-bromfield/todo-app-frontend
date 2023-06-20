import { ToastController, ToastOptions } from "@ionic/angular";

// Add helper functions here


/**
 * Shows a toast
 * @param toastController 
 * @param props 
 */
export async function showToast(toastController:ToastController, props: { message: ToastOptions['message'], color?: ToastOptions['color'], icon?: ToastOptions['icon'], duration?: ToastOptions['duration'], position?: ToastOptions['position'] }) {
    const toast = await toastController.create({
      position: props.position ?? 'bottom',
      duration: props.duration ?? 3000,
      message: props.message,
      icon: props.icon

    });
    await toast.present();
  }
