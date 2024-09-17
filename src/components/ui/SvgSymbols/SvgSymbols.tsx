enum Icons {
  Magnifier = "magnifier",
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
  GirlPointing = "girl-pointing",
  MenuBar = "menu-bar",
  User = "user",
  Logout = "logout",
  Shield = "shield",
  Google = "google",
  Home = "home",
  UploadWhite = "upload-white",
}

export type IconType = `${Icons}`;

const SvgSymbols = (
  <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
    <symbol id={Icons.Magnifier}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
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
    <symbol id={Icons.GirlPointing}>
      <g clipPath="url(#clip0_546_388)">
        <path
          d="M119.988 400.282L132.248 400.281L138.08 352.993L119.986 352.994L119.988 400.282Z"
          fill="#D5A495"
        />
        <path
          d="M116.862 412.166L156.392 412.164V411.664C156.392 409.644 155.994 407.643 155.221 405.776C154.448 403.909 153.314 402.213 151.886 400.784C150.457 399.356 148.761 398.222 146.894 397.449C145.027 396.676 143.026 396.278 141.006 396.278L116.861 396.279L116.862 412.166Z"
          fill="#2F2E41"
        />
        <path
          d="M75.9878 400.282L88.2478 400.281L94.0798 352.993L75.9858 352.994L75.9878 400.282Z"
          fill="#D5A495"
        />
        <path
          d="M72.8615 412.166L112.392 412.164V411.664C112.392 409.644 111.994 407.643 111.221 405.776C110.448 403.909 109.314 402.213 107.885 400.784C106.457 399.356 104.76 398.222 102.894 397.449C101.027 396.676 99.0261 396.278 97.0055 396.278L72.8607 396.279L72.8615 412.166Z"
          fill="#2F2E41"
        />
        <path
          d="M92.7472 381.932L109.824 259.004C109.871 258.663 110.034 258.349 110.286 258.115C110.537 257.88 110.861 257.738 111.204 257.714C111.548 257.69 111.889 257.785 112.17 257.982C112.452 258.179 112.658 258.467 112.752 258.798L124.193 298.792C125.057 301.806 125.341 304.957 125.027 308.076L115.828 380.356C115.768 380.966 115.832 381.583 116.019 382.168C116.205 382.753 116.509 383.293 116.912 383.756C117.315 384.219 117.808 384.595 118.362 384.86C118.915 385.125 119.517 385.275 120.13 385.299L131.84 385.679C132.918 385.721 133.975 385.375 134.819 384.704C135.662 384.033 136.237 383.08 136.438 382.021L151.268 303.872C152.092 299.534 152.267 295.098 151.788 290.708L140.569 187.797L84.6894 189.82L84.557 190.086C67.6789 223.987 70.4042 299.41 73.0397 372.351L73.3681 381.472C73.4055 382.638 73.8959 383.743 74.7352 384.553C75.5745 385.363 76.6965 385.814 77.8629 385.81L88.2885 385.813H88.2907C89.3757 385.809 90.4231 385.414 91.2414 384.702C92.0596 383.989 92.5941 383.006 92.7472 381.932Z"
          fill="#2F2E41"
        />
        <path
          d="M94.9731 84.9094C81.4085 84.9094 70.4121 73.9131 70.4121 60.3484C70.4121 46.7837 81.4085 35.7874 94.9731 35.7874C108.538 35.7874 119.534 46.7837 119.534 60.3484C119.534 73.9131 108.538 84.9094 94.9731 84.9094Z"
          fill="#D5A495"
        />
        <path
          d="M141.41 193.771C141.833 193.264 142.139 192.669 142.306 192.03C142.472 191.391 142.496 190.723 142.375 190.074L128.709 116.433L125.47 109.542C122.773 103.794 118.306 99.0608 112.724 96.035C107.142 93.0091 100.738 91.8498 94.4495 92.7268C90.0358 93.3297 85.8131 94.913 82.091 97.3605C78.369 99.8081 75.2421 103.058 72.9397 106.871C70.6373 110.685 69.2179 114.965 68.7854 119.399C68.353 123.833 68.9186 128.307 70.4408 132.493L85.1846 173.047L82.6739 190.243C82.5806 190.883 82.6259 191.534 82.8069 192.154C82.9879 192.774 83.3003 193.348 83.7228 193.837C84.1452 194.326 84.6679 194.718 85.2553 194.986C85.8427 195.255 86.4811 195.394 87.127 195.394H137.95C138.611 195.395 139.263 195.25 139.862 194.969C140.46 194.689 140.989 194.279 141.41 193.771Z"
          fill="#C0F1A1"
        />
        <path
          d="M30.6636 238.53C32.1934 238.175 33.6267 237.488 34.8625 236.519C36.0983 235.55 37.1066 234.322 37.8164 232.921C38.5262 231.52 38.9201 229.98 38.9705 228.41C39.0209 226.841 38.7266 225.279 38.1082 223.835L77.7104 134.363L55.0559 128.657L23.2517 218.4C20.8954 219.599 19.061 221.622 18.0961 224.084C17.1312 226.545 17.1029 229.276 18.0165 231.757C18.9301 234.238 20.7222 236.298 23.0531 237.546C25.384 238.795 28.0919 239.145 30.6636 238.53Z"
          fill="#D5A495"
        />
        <path
          d="M76.3609 150.398C76.9927 150.115 77.5561 149.7 78.0126 149.18C78.4692 148.659 78.808 148.047 79.0062 147.383L85.9303 124.22C87.4297 121.013 87.5968 117.343 86.395 114.013C85.1933 110.683 82.7206 107.966 79.5188 106.455C76.317 104.945 72.6471 104.766 69.3132 105.956C65.9793 107.147 63.2533 109.61 61.7323 112.807L48.3419 133.03C47.9598 133.607 47.7065 134.26 47.5994 134.943C47.4923 135.627 47.5338 136.326 47.7212 136.993C47.9086 137.659 48.2373 138.277 48.6851 138.805C49.1329 139.333 49.6892 139.758 50.3161 140.051L72.3496 150.365C72.9764 150.659 73.6593 150.814 74.3516 150.82C75.0438 150.825 75.7292 150.682 76.3609 150.398Z"
          fill="#C0F1A1"
        />
        <path
          d="M195.865 8.29153C196.343 9.78745 196.487 11.37 196.288 12.9278C196.088 14.4856 195.55 15.9807 194.71 17.3078C193.87 18.6349 192.749 19.7616 191.427 20.6088C190.105 21.4559 188.612 22.0028 187.056 22.2109L130.487 102.046L113.984 85.5091L174.779 12.2341C174.603 9.59584 175.4 6.98454 177.021 4.89508C178.641 2.80561 180.972 1.38312 183.571 0.897152C186.17 0.41118 188.857 0.895501 191.123 2.25833C193.389 3.62115 195.076 5.76782 195.865 8.29153Z"
          fill="#D5A495"
        />
        <path
          d="M141.486 89.2463L121.344 75.603C120.77 75.2148 120.12 74.9547 119.438 74.8404C118.755 74.7261 118.056 74.7602 117.387 74.9406C116.719 75.1209 116.098 75.4431 115.565 75.8853C115.033 76.3275 114.601 76.8793 114.301 77.5031L103.789 99.3606C101.82 102.304 101.098 105.908 101.782 109.383C102.466 112.858 104.5 115.92 107.438 117.897C110.376 119.875 113.978 120.607 117.455 119.932C120.931 119.258 123.999 117.232 125.984 114.3L142.333 96.4908C142.801 95.9808 143.154 95.3758 143.367 94.7173C143.58 94.0587 143.649 93.3619 143.568 92.6744C143.488 91.9869 143.26 91.3248 142.901 90.7333C142.541 90.1417 142.059 89.6345 141.486 89.2463Z"
          fill="#C0F1A1"
        />
        <path
          d="M212.79 413H1.78955C1.52433 413 1.26999 412.895 1.08246 412.707C0.894922 412.52 0.789551 412.265 0.789551 412C0.789551 411.735 0.894922 411.48 1.08246 411.293C1.26999 411.105 1.52433 411 1.78955 411H212.79C213.055 411 213.309 411.105 213.497 411.293C213.684 411.48 213.79 411.735 213.79 412C213.79 412.265 213.684 412.52 213.497 412.707C213.309 412.895 213.055 413 212.79 413Z"
          fill="#CCCCCC"
        />
        <path
          d="M101.814 57.1152C106.856 62.8685 113.781 69.2296 121.17 66.3746C126.021 64.4999 128.703 59.4123 128.259 54.2303C127.462 44.9115 120.211 39.0394 113.095 34.1385C103.843 27.7674 93.4871 21.9305 82.2539 21.9131C71.0207 21.8957 59.0839 29.7146 58.2397 40.916C57.5609 49.924 63.8491 59.1769 60.4709 67.5551C57.0709 75.9869 46.0751 78.0641 37.0077 77.4015C27.9404 76.7388 18.113 74.7528 10.2876 79.3808C0.304908 85.2847 -1.35142 99.9886 3.97495 110.291C9.30131 120.594 19.6095 127.288 29.88 132.676C43.4877 139.814 58.6938 145.632 73.9087 143.479C89.1236 141.325 103.752 128.777 103.445 113.414C103.315 106.924 100.662 100.788 98.1078 94.8206C95.5535 88.8535 93.0093 82.6463 93.1156 76.1564C93.2042 70.7482 95.6233 65.0629 99.9829 62.1071C100.769 61.5957 101.373 60.8483 101.708 59.9722C102.043 59.0961 102.092 58.1365 101.847 57.231L101.814 57.1152Z"
          fill="#2F2E41"
        />
      </g>
      <defs>
        <clipPath id="clip0_546_388">
          <rect
            width="214"
            height="413"
            fill="white"
            transform="matrix(-1 0 0 1 214 0)"
          />
        </clipPath>
      </defs>
    </symbol>
    <symbol id={Icons.Logo} stroke="transparent">
      <path
        d="M-0.00830078 34.2097V2.35259H15.1436C19.024 2.35259 21.9804 3.11109 24.013 4.6281C26.0456 6.11476 27.0619 8.11721 27.0619 10.6354C27.0619 12.3345 26.6615 13.7908 25.8608 15.0044C25.0601 16.1877 23.9822 17.113 22.6272 17.7805C21.3029 18.4177 19.8555 18.7362 18.2848 18.7362L19.1164 17.0979C20.9333 17.0979 22.5656 17.4316 24.013 18.0991C25.4604 18.7362 26.5999 19.6768 27.4314 20.9207C28.2937 22.1647 28.7249 23.712 28.7249 25.5628C28.7249 28.2934 27.6624 30.4172 25.5374 31.9342C23.4125 33.4512 20.2558 34.2097 16.0675 34.2097H-0.00830078ZM5.99703 29.5677H15.6979C17.9461 29.5677 19.6707 29.2036 20.8718 28.4754C22.0728 27.7473 22.6734 26.5792 22.6734 24.9711C22.6734 23.3934 22.0728 22.2405 20.8718 21.5124C19.6707 20.7539 17.9461 20.3746 15.6979 20.3746H5.53508V15.7781H14.4969C16.591 15.7781 18.1925 15.414 19.3011 14.6858C20.4406 13.9577 21.0103 12.8654 21.0103 11.4091C21.0103 9.92244 20.4406 8.81503 19.3011 8.08687C18.1925 7.35871 16.591 6.99462 14.4969 6.99462H5.99703V29.5677Z"
        fill="black"
      />
      <path
        d="M46.1746 34.5283C43.4337 34.5283 41.0316 33.9973 38.9682 32.9354C36.9356 31.8432 35.3496 30.3565 34.2101 28.4754C33.1015 26.5943 32.5471 24.4554 32.5471 22.0585C32.5471 19.6313 33.0861 17.4923 34.1639 15.6416C35.2726 13.7605 36.7817 12.289 38.691 11.2271C40.6312 10.1652 42.8332 9.63421 45.2969 9.63421C47.699 9.63421 49.8394 10.15 51.718 11.1816C53.5966 12.2131 55.0748 13.6694 56.1527 15.5505C57.2306 17.4316 57.7695 19.6464 57.7695 22.195C57.7695 22.4377 57.7541 22.7108 57.7233 23.0142C57.7233 23.3176 57.7079 23.6058 57.6771 23.8789H37.1204V20.1015H54.6283L52.3647 21.2848C52.3955 19.8892 52.1029 18.6604 51.487 17.5985C50.8711 16.5366 50.0242 15.7022 48.9463 15.0954C47.8992 14.4886 46.6827 14.1852 45.2969 14.1852C43.8803 14.1852 42.633 14.4886 41.5551 15.0954C40.508 15.7022 39.6765 16.5518 39.0606 17.644C38.4755 18.7059 38.1829 19.965 38.1829 21.4213V22.3315C38.1829 23.7879 38.5217 25.0773 39.1992 26.1999C39.8767 27.3225 40.8314 28.1872 42.0633 28.794C43.2951 29.4008 44.7118 29.7042 46.3132 29.7042C47.699 29.7042 48.9463 29.4918 50.055 29.067C51.1636 28.6423 52.1491 27.9748 53.0114 27.0646L56.1065 30.5689C54.9978 31.8432 53.5966 32.8292 51.9028 33.527C50.2397 34.1945 48.3304 34.5283 46.1746 34.5283Z"
        fill="black"
      />
      <path
        d="M76.9898 34.5283C74.8956 34.5283 73.0324 34.0732 71.4002 33.163C69.768 32.2528 68.4745 30.8875 67.5199 29.067C66.596 27.2163 66.134 24.8801 66.134 22.0585C66.134 19.2065 66.6114 16.8703 67.566 15.0499C68.5515 13.2295 69.8604 11.8794 71.4926 10.9995C73.1556 10.0893 74.988 9.63421 76.9898 9.63421C79.4227 9.63421 81.5631 10.15 83.4109 11.1816C85.2895 12.2131 86.7677 13.6543 87.8456 15.505C88.9542 17.3558 89.5086 19.5403 89.5086 22.0585C89.5086 24.5767 88.9542 26.7612 87.8456 28.6119C86.7677 30.4627 85.2895 31.919 83.4109 32.9809C81.5631 34.0125 79.4227 34.5283 76.9898 34.5283ZM63.3161 34.2097V0.441162H69.0905V15.5505L68.6285 22.013L68.8133 28.4754V34.2097H63.3161ZM76.3431 29.6587C77.7289 29.6587 78.9608 29.3553 80.0386 28.7485C81.1473 28.1417 82.025 27.2618 82.6717 26.1089C83.3185 24.956 83.6418 23.6058 83.6418 22.0585C83.6418 20.4808 83.3185 19.1307 82.6717 18.0081C82.025 16.8552 81.1473 15.9753 80.0386 15.3685C78.9608 14.7617 77.7289 14.4583 76.3431 14.4583C74.9572 14.4583 73.71 14.7617 72.6013 15.3685C71.4926 15.9753 70.6149 16.8552 69.9682 18.0081C69.3214 19.1307 68.9981 20.4808 68.9981 22.0585C68.9981 23.6058 69.3214 24.956 69.9682 26.1089C70.6149 27.2618 71.4926 28.1417 72.6013 28.7485C73.71 29.3553 74.9572 29.6587 76.3431 29.6587Z"
        fill="black"
      />
      <path
        d="M106.072 34.5283C103.546 34.5283 101.298 33.9973 99.3271 32.9354C97.3562 31.8432 95.8009 30.3565 94.6615 28.4754C93.522 26.5943 92.9523 24.4554 92.9523 22.0585C92.9523 19.6313 93.522 17.4923 94.6615 15.6416C95.8009 13.7605 97.3562 12.289 99.3271 11.2271C101.298 10.1652 103.546 9.63421 106.072 9.63421C108.628 9.63421 110.891 10.1652 112.862 11.2271C114.864 12.289 116.419 13.7453 117.528 15.596C118.667 17.4468 119.237 19.6009 119.237 22.0585C119.237 24.4554 118.667 26.5943 117.528 28.4754C116.419 30.3565 114.864 31.8432 112.862 32.9354C110.891 33.9973 108.628 34.5283 106.072 34.5283ZM106.072 29.6587C107.488 29.6587 108.751 29.3553 109.86 28.7485C110.968 28.1417 111.831 27.2618 112.446 26.1089C113.093 24.956 113.417 23.6058 113.417 22.0585C113.417 20.4808 113.093 19.1307 112.446 18.0081C111.831 16.8552 110.968 15.9753 109.86 15.3685C108.751 14.7617 107.504 14.4583 106.118 14.4583C104.701 14.4583 103.438 14.7617 102.33 15.3685C101.252 15.9753 100.39 16.8552 99.7429 18.0081C99.0962 19.1307 98.7728 20.4808 98.7728 22.0585C98.7728 23.6058 99.0962 24.956 99.7429 26.1089C100.39 27.2618 101.252 28.1417 102.33 28.7485C103.438 29.3553 104.686 29.6587 106.072 29.6587Z"
        fill="black"
      />
      <path
        d="M138.432 34.5283C136.431 34.5283 134.598 34.0732 132.935 33.163C131.303 32.2528 129.994 30.8875 129.009 29.067C128.054 27.2163 127.577 24.8801 127.577 22.0585C127.577 19.2065 128.039 16.8703 128.963 15.0499C129.917 13.2295 131.211 11.8794 132.843 10.9995C134.475 10.0893 136.338 9.63421 138.432 9.63421C140.865 9.63421 143.006 10.15 144.854 11.1816C146.732 12.2131 148.21 13.6543 149.288 15.505C150.397 17.3558 150.951 19.5403 150.951 22.0585C150.951 24.5767 150.397 26.7764 149.288 28.6575C148.21 30.5082 146.732 31.9494 144.854 32.9809C143.006 34.0125 140.865 34.5283 138.432 34.5283ZM124.759 43.0387V9.90727H130.256V15.6416L130.071 22.104L130.533 28.5664V43.0387H124.759ZM137.786 29.6587C139.172 29.6587 140.403 29.3553 141.481 28.7485C142.59 28.1417 143.468 27.2618 144.114 26.1089C144.761 24.956 145.085 23.6058 145.085 22.0585C145.085 20.4808 144.761 19.1307 144.114 18.0081C143.468 16.8552 142.59 15.9753 141.481 15.3685C140.403 14.7617 139.172 14.4583 137.786 14.4583C136.4 14.4583 135.153 14.7617 134.044 15.3685C132.935 15.9753 132.058 16.8552 131.411 18.0081C130.764 19.1307 130.441 20.4808 130.441 22.0585C130.441 23.6058 130.764 24.956 131.411 26.1089C132.058 27.2618 132.935 28.1417 134.044 28.7485C135.153 29.3553 136.4 29.6587 137.786 29.6587Z"
        fill="black"
      />
      <path
        d="M110.523 21.9788C110.523 24.3352 108.584 26.2454 106.192 26.2454C103.8 26.2454 101.861 24.3352 101.861 21.9788C101.861 19.6225 103.8 17.7123 106.192 17.7123C108.584 17.7123 110.523 19.6225 110.523 21.9788Z"
        fill="#C6C99D"
      />
    </symbol>
    <symbol id={Icons.MenuBar} viewBox="0 0 50 50" fill="black">
      <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z" />
    </symbol>
    <symbol id={Icons.User}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </symbol>
    <symbol id={Icons.Logout}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </symbol>
    <symbol id={Icons.Shield}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </symbol>
    <symbol viewBox="0 0 48 48" id={Icons.Google}>
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      ></path>
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      ></path>
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      ></path>
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      ></path>
      <path fill="none" d="M0 0h48v48H0z"></path>
    </symbol>
    <symbol id={Icons.Home}>
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </symbol>

    <symbol id={Icons.UploadWhite}>
      <path
        d="M63.9774 45.4837V57.6127C63.9774 59.2211 63.3385 60.7636 62.2012 61.9009C61.0639 63.0382 59.5213 63.6772 57.9129 63.6772H15.4615C13.8531 63.6772 12.3105 63.0382 11.1732 61.9009C10.0359 60.7636 9.39697 59.2211 9.39697 57.6127V45.4837"
        stroke="white"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M51.8483 24.258L36.6871 9.09674L21.5259 24.258"
        stroke="white"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36.6875 9.09674V45.4837"
        stroke="white"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </symbol>
  </svg>
);

export default SvgSymbols;
