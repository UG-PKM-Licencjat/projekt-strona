enum Icons {
  Magnifier = "magnifier",
  Profile = "profile",
  Spinner = "spinner",
  Users = "users",
  Settings = "settings",
  Logo = "logo",
  ArrowDown = "arrow-down",
  BadgeCheck = "badge-check",
  Star = "star",
  Wallet = "wallet",
  Plus = "plus",
  Upload = "upload",
  MessageSquare = "message-square",
  Trash = "trash",
  BadgeDollarSign = "badge-dollar-sign",
  ScrollText = "scroll-text",
  Tags = "tags",
}

export type IconType = `${Icons}`;

const SvgSymbols = (
  <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
    <symbol id={Icons.Magnifier}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </symbol>
    <symbol id={Icons.Profile}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </symbol>
    <symbol id={Icons.Spinner}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </symbol>
    <symbol id={Icons.Users}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </symbol>
    <symbol id={Icons.Settings}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </symbol>
    <symbol id={Icons.Logo}>
      <path d="M6.435,9.444C6.227,9.289,6.019,9.211,5.811,9.211H4.877v5.597h0.935c0.208,0,0.416-0.078,0.624-0.233  c0.208-0.155,0.312-0.388,0.312-0.7v-3.731C6.747,9.833,6.642,9.599,6.435,9.444L6.435,9.444z M21.648,0H2.352  C1.055,0,0.003,1.049,0,2.346v19.307C0.003,22.951,1.055,24,2.352,24h19.296c1.297,0,2.349-1.049,2.352-2.346V2.346  C23.997,1.049,22.945,0,21.648,0z M8.261,13.885c0,1.008-0.622,2.534-2.591,2.531H3.184V7.552h2.538  c1.899,0,2.537,1.525,2.538,2.533L8.261,13.885L8.261,13.885z M13.654,9.136H10.8v2.058h1.745v1.584H10.8v2.058h2.855v1.584h-3.331  c-0.598,0.016-1.095-0.457-1.11-1.055V8.663C9.199,8.065,9.672,7.569,10.27,7.554h3.385L13.654,9.136L13.654,9.136z M19.206,15.312  c-0.707,1.647-1.974,1.319-2.541,0l-2.064-7.757h1.745l1.592,6.092l1.584-6.092h1.745L19.206,15.312L19.206,15.312z" />
    </symbol>
    <symbol id={Icons.ArrowDown}>
      <path d="m6 9 6 6 6-6" />
    </symbol>
    <symbol id={Icons.BadgeCheck}>
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="m9 12 2 2 4-4" />
    </symbol>
    <symbol id={Icons.Star}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </symbol>
    <symbol id={Icons.Wallet}>
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </symbol>
    <symbol id={Icons.Plus}>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </symbol>
    <symbol id={Icons.Upload}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </symbol>
    <symbol id={Icons.MessageSquare}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </symbol>
    <symbol id={Icons.Trash}>
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </symbol>
    <symbol id={Icons.BadgeDollarSign}>
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
      <path d="M12 18V6" />
    </symbol>
    <symbol id={Icons.ScrollText}>
      <path d="M15 12h-5" />
      <path d="M15 8h-5" />
      <path d="M19 17V5a2 2 0 0 0-2-2H4" />
      <path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3" />
    </symbol>
    <symbol id={Icons.Tags}>
      <path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19" />
      <path d="M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="6.5" cy="9.5" r=".5" fill="currentColor" />
    </symbol>
  </svg>
);

export default SvgSymbols;
