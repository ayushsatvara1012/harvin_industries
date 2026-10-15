import { WHATSAPP_HREF } from "@/data/contact";

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Harvin Industries on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M16.004 3C9.384 3 4 8.384 4 15.004c0 2.116.553 4.18 1.6 6L4 28l7.164-1.564a12 12 0 0 0 4.84 1.016h.004C22.62 27.452 28 22.068 28 15.448 28 9.828 22.62 3 16.004 3Zm0 21.4h-.003a9.95 9.95 0 0 1-5.07-1.39l-.364-.216-4.25.928.944-4.14-.236-.38a9.93 9.93 0 0 1-1.52-5.298c0-5.49 4.468-9.956 9.96-9.956 5.49 0 9.956 4.466 9.956 9.956 0 5.49-4.466 9.496-9.417 10.496Zm5.46-7.45c-.3-.15-1.77-.874-2.044-.974-.274-.1-.474-.15-.674.15-.2.3-.774.974-.95 1.174-.174.2-.35.224-.65.074-.3-.15-1.264-.466-2.408-1.486-.89-.794-1.49-1.774-1.664-2.074-.174-.3-.018-.462.132-.612.136-.134.3-.35.45-.524.15-.176.2-.3.3-.5.1-.2.05-.376-.026-.526-.074-.15-.674-1.624-.924-2.224-.244-.584-.49-.504-.674-.514l-.574-.01c-.2 0-.524.074-.8.376-.274.3-1.048 1.024-1.048 2.5 0 1.474 1.074 2.9 1.224 3.1.15.2 2.114 3.228 5.12 4.526.716.31 1.274.494 1.71.632.718.228 1.372.196 1.888.12.576-.086 1.77-.724 2.02-1.424.25-.7.25-1.3.174-1.424-.074-.124-.274-.2-.574-.35Z" />
      </svg>
    </a>
  );
}
