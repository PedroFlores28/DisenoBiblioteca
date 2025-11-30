<template>
  <section class="sitios-section">
    <div class="container">
      <h2 class="section-title">Sitios recomendados para tus estudios</h2>
      <p class="section-subtitle">
        Accede a libros, revistas, normas y otras fuentes externas disponibles de uso público.
      </p>
      <div class="sites-carousel">
        <div class="carousel-wrapper" ref="carouselWrapper">
          <div class="carousel-container" :style="windowWidth > 768 ? { transform: `translateX(-${carouselTransform}%)` } : {}">
            <div 
              v-for="site in sites" 
              :key="site.id"
              class="site-card"
            >
              <div class="site-icon">
                <svg v-if="site.iconType === 'book'" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M56.1863 47.4557C56.0219 48.504 55.0969 49.2645 54.0487 49.1823C53.2471 49.1412 52.1166 48.9562 50.8217 48.7301C48.5607 48.3396 45.7448 47.8668 42.8672 47.8668C39.4963 47.8668 36.886 48.6479 34.7894 49.2851C34.5222 49.3673 34.2756 49.4289 34.0289 49.5111V19.0499C35.8583 17.8783 40.5652 15.2063 45.5187 15.1857C45.5598 15.1857 49.3418 14.8569 53.0621 16.604C54.7886 17.4056 56.6385 19.1321 56.6385 21.0026V35.596C56.6796 39.4396 56.7001 44.2287 56.1863 47.4763V47.4557ZM29.1576 49.2851C27.0611 48.6479 24.4507 47.8668 21.0798 47.8668C18.2023 47.8668 15.3863 48.3396 13.1254 48.7301C11.8305 48.9562 10.7 49.1412 9.8984 49.1823C8.87069 49.2439 7.9252 48.504 7.76077 47.4557C7.24691 44.2082 7.26747 39.4191 7.28802 35.5754V20.982C7.28802 19.1116 9.13789 17.385 10.8644 16.5834C14.5847 14.8569 18.3667 15.1652 18.6133 15.1857C23.423 15.1857 28.0888 17.8578 29.9181 19.0294V49.4906C29.6715 49.4084 29.4248 49.3467 29.1576 49.2645V49.2851ZM60.7699 35.5549V21.0026C60.7699 17.0562 57.5634 14.158 54.8297 12.8837C50.0612 10.6638 45.3543 11.0749 45.3543 11.0955C39.6197 11.0955 34.3167 13.9936 31.9941 15.4735C29.692 13.9936 24.4302 11.0955 18.86 11.0955C18.675 11.0749 13.9476 10.6433 9.179 12.8837C6.4453 14.158 3.2183 17.0562 3.2183 21.0026V35.5754C3.17719 39.5629 3.15664 44.537 3.73216 48.1135C4.22546 51.2582 6.95916 53.4781 10.1656 53.2931C11.1933 53.2314 12.4266 53.0259 13.8448 52.7793C16.0646 52.4093 18.5928 51.9776 21.121 51.9776C23.8958 51.9776 26.0745 52.6354 28.0066 53.2109C28.4382 53.3342 28.8493 53.4575 29.2604 53.5809C30.1648 53.8275 31.0897 53.9508 31.9941 53.9508C32.8985 53.9508 33.844 53.8275 34.7483 53.5809C35.1594 53.4781 35.5705 53.3342 36.0021 53.2109C37.9342 52.6354 40.1335 51.9776 42.8878 51.9776C45.4159 51.9776 47.9441 52.4093 50.1639 52.7793C51.5822 53.0259 52.8154 53.2314 53.8431 53.2931C57.0907 53.4781 59.7833 51.2377 60.2766 48.1135C60.8521 44.5165 60.811 39.5424 60.7904 35.5549H60.7493H60.7699Z" fill="#024588"/>
                </svg>
                <svg v-else-if="site.iconType === 'document'" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50.4405 56.2601C49.295 55.2987 46.6562 52.9463 46.6562 52.9463C45.8789 52.2508 44.713 52.2508 43.9357 52.9463C43.9357 52.9463 41.3378 55.2577 40.1923 56.2396C40.09 54.6236 40.1309 50.9416 40.2332 47.2187C41.7878 47.9347 43.5061 48.3438 45.3062 48.3438C47.1063 48.3438 48.8654 47.9347 50.42 47.2187C50.5019 51.003 50.5223 54.7464 50.42 56.2601H50.4405ZM45.3062 27.8883C49.8268 27.8883 53.4884 31.5499 53.4884 36.0706C53.4884 40.5912 49.8268 44.2527 45.3062 44.2527C40.7855 44.2527 37.124 40.5912 37.124 36.0706C37.124 31.5499 40.7855 27.8883 45.3062 27.8883ZM57.5794 36.0706C57.5794 29.2998 52.0769 23.7973 45.3062 23.7973C38.5354 23.7973 33.0329 29.2998 33.0329 36.0706C33.0329 39.2411 34.2398 42.1253 36.224 44.2936C36.1217 47.1369 35.8353 56.0146 36.2444 57.7329C36.2444 57.8351 36.3058 57.9988 36.3262 58.1011C36.6944 59.267 37.5536 60.1466 38.6991 60.4739C39.9673 60.8421 41.4196 60.5148 42.5651 59.5738C43.1379 59.1034 44.3448 58.0397 45.3062 57.201C46.2676 58.0397 47.4745 59.1034 48.0472 59.5738C48.8859 60.2489 49.8677 60.6171 50.8496 60.6171C51.2178 60.6171 51.5655 60.5762 51.9133 60.4739C53.0588 60.1466 53.9179 59.267 54.3475 57.917C54.7975 56.0351 54.552 47.0756 54.4498 44.2527C56.393 42.0845 57.5999 39.2207 57.5999 36.0706H57.5794ZM21.987 9.25342C22.8256 8.33293 23.9302 7.76018 25.1371 7.53517V17.6606C25.1371 18.7857 24.2166 19.7062 23.0916 19.7062H11.8001C12.0661 19.1334 12.4343 18.622 12.9047 18.172L21.987 9.25342ZM23.0916 23.7973C26.4872 23.7973 29.2282 21.0358 29.2282 17.6606V7.43289H42.5242C45.3675 7.43289 47.8222 9.35571 48.4972 12.1376C48.9063 13.8559 49.2132 15.7174 49.4382 17.8652C49.5405 18.9289 50.4405 19.7062 51.4837 19.7062H51.7087C52.8338 19.5834 53.652 18.5811 53.5293 17.4561C53.2838 15.1242 52.9361 13.0786 52.486 11.1967C51.3814 6.57378 47.2904 3.3418 42.5242 3.3418H26.078C23.3779 3.3418 20.7801 4.4873 19.0209 6.41011L10.0001 15.2469C8.36363 16.8629 7.34085 18.9902 7.1363 21.2812L7.05448 22.2222C6.7681 25.4337 6.3999 29.4225 6.3999 31.9999C6.3999 42.1867 6.84992 48.0165 7.99543 52.8031C9.10002 57.426 13.1911 60.658 17.9572 60.658H27.3667C28.4918 60.658 29.4123 59.7375 29.4123 58.6124C29.4123 57.4874 28.4918 56.5669 27.3667 56.5669H17.9572C15.1139 56.5669 12.6593 54.6441 11.9842 51.8622C10.9206 47.4233 10.5114 41.8799 10.5114 32.0204C10.5114 29.9339 10.7774 26.7019 11.0433 23.8382H23.0711V23.7973H23.0916Z" fill="#024588"/>
                </svg>
                <svg v-else-if="site.iconType === 'people'" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M37.6623 51.9337C36.1209 51.6045 35.2371 51.4811 32.0105 51.4811C28.7838 51.4811 27.7768 51.6251 26.3587 51.9337C24.2624 52.3862 21.5495 53.8262 20.378 58.2285C20.0903 59.3188 20.748 60.4502 21.8372 60.7382C22.0016 60.7794 22.1866 60.7999 22.351 60.7999C23.2553 60.7999 24.0979 60.1828 24.3446 59.2571C25.0228 56.6857 26.297 56.1302 27.2013 55.9451C28.3317 55.6982 28.8866 55.5954 32.0105 55.5954C35.1344 55.5954 35.6893 55.7188 36.7991 55.9451C37.7034 56.1302 38.9776 56.6857 39.6558 59.2571C39.9024 60.1828 40.7245 60.7999 41.6494 60.7999C41.8138 60.7999 41.9987 60.7999 42.1632 60.7382C43.2524 60.4502 43.9101 59.3188 43.6223 58.2285C42.4714 53.8262 39.738 52.3657 37.6417 51.9337H37.6623ZM46.849 21.3028C46.849 23.36 48.5343 25.0468 50.5895 25.0468C52.6447 25.0468 54.3299 23.36 54.3299 21.3028C54.3299 19.2457 52.6447 17.5588 50.5895 17.5588C48.5343 17.5588 46.849 19.2457 46.849 21.3028ZM42.7386 21.3028C42.7386 16.9622 46.253 13.4445 50.5895 13.4445C54.9259 13.4445 58.4403 16.9622 58.4403 21.3028C58.4403 25.6434 54.9259 29.1611 50.5895 29.1611C46.253 29.1611 42.7386 25.6434 42.7386 21.3028ZM60.7833 41.6274L60.5572 39.9405C60.1256 36.2377 58.4814 33.872 55.5631 32.6994C53.9394 32.0617 51.7404 31.9588 50.5689 31.9588C49.3975 31.9588 47.1984 32.0617 45.5953 32.6994C45.1432 32.8845 44.7322 33.0902 44.3211 33.3371C43.3552 33.9337 43.0469 35.1885 43.6223 36.1554C44.0128 36.7931 44.6911 37.1428 45.3898 37.1428C45.7598 37.1428 46.1297 37.04 46.4585 36.8342C46.664 36.7108 46.8901 36.608 47.1162 36.5051C47.815 36.2171 49.1508 36.0525 50.5895 36.0525C52.0281 36.0525 53.364 36.2171 54.0628 36.5051C55.0698 36.896 56.1591 37.5542 56.4879 40.4137L56.714 42.1211C56.9195 43.6639 56.5084 44.0342 55.9741 44.24L46.4174 44.2811C45.2871 44.2811 44.3622 45.2068 44.3622 46.3382C44.3622 47.4697 45.2871 48.3954 46.4174 48.3954L56.3029 48.3542H56.3235C56.529 48.3542 56.714 48.3542 56.9195 48.2514C56.9606 48.2514 57.0222 48.2102 57.0839 48.1897C58.7692 47.5931 61.2765 45.9885 60.7216 41.6068H60.7627L60.7833 41.6274ZM9.75266 21.3028C9.75266 23.36 11.4379 25.0468 13.4931 25.0468C15.5483 25.0468 17.2336 23.36 17.2336 21.3028C17.2336 19.2457 15.5483 17.5588 13.4931 17.5588C11.4379 17.5588 9.75266 19.2457 9.75266 21.3028ZM5.64226 21.3028C5.64226 16.9622 9.15665 13.4445 13.4931 13.4445C17.8296 13.4445 21.344 16.9622 21.344 21.3028C21.344 25.6434 17.8296 29.1611 13.4931 29.1611C9.15665 29.1611 5.64226 25.6434 5.64226 21.3028ZM28.2495 11.0582C28.2495 13.1154 29.9347 14.8022 31.9899 14.8022C34.0451 14.8022 35.7304 13.1154 35.7304 11.0582C35.7304 9.00109 34.0451 7.31424 31.9899 7.31424C29.9347 7.31424 28.2495 9.00109 28.2495 11.0582ZM24.1391 11.0582C24.1391 6.71767 27.6534 3.19995 31.9899 3.19995C36.3264 3.19995 39.8408 6.71767 39.8408 11.0582C39.8408 15.3988 36.3264 18.9165 31.9899 18.9165C27.6534 18.9165 24.1391 15.3988 24.1391 11.0582ZM36.1003 40.2079C36.1003 37.9451 34.2506 36.0937 31.9899 36.0937C29.7292 36.0937 27.8795 37.9451 27.8795 40.2079C27.8795 42.4708 29.7292 44.3222 31.9899 44.3222C34.2506 44.3222 36.1003 42.4708 36.1003 40.2079ZM40.2107 40.2079C40.2107 44.7542 36.5114 48.4365 31.9899 48.4365C27.4685 48.4365 23.7691 44.7337 23.7691 40.2079C23.7691 35.6822 27.4685 31.9794 31.9899 31.9794C36.5114 31.9794 40.2107 35.6822 40.2107 40.2079ZM7.57415 40.4342C7.90298 37.5954 9.01279 36.9371 9.99928 36.5462C10.6981 36.2788 12.0339 36.0937 13.4726 36.0937C14.9112 36.0937 16.2471 36.2582 16.9459 36.5462C17.1719 36.6285 17.398 36.7519 17.6035 36.8754C17.9324 37.0811 18.3023 37.1839 18.6722 37.1839C19.371 37.1839 20.0492 36.8342 20.4397 36.1965C21.0357 35.2297 20.7274 33.9542 19.7409 33.3782C19.3504 33.1314 18.9188 32.9257 18.4667 32.7405C16.8431 32.1028 14.644 32 13.4726 32C12.3011 32 10.102 32.1028 8.49899 32.7405C5.5806 33.8925 3.93645 36.2582 3.50485 39.9611L3.27878 41.6685C2.72388 46.0297 5.23122 47.6548 6.91648 48.2514H6.93704C6.93704 48.2514 7.0398 48.2925 7.10145 48.3131C7.30697 48.3748 7.49194 48.3954 7.69746 48.4159L17.583 48.4571C18.7133 48.4571 19.6382 47.5314 19.6382 46.3999C19.6382 45.2685 18.7339 44.3428 17.583 44.3428L8.02629 44.3017C7.51249 44.0959 7.10145 43.7257 7.28642 42.1828L7.51249 40.4548H7.5536L7.57415 40.4342ZM22.536 27.2274C23.317 24.8822 24.7762 23.3188 27.0163 22.4137C28.6399 21.7759 30.839 21.6731 32.0105 21.6731C33.1819 21.6731 35.3604 21.7759 36.9841 22.4137C39.2242 23.2982 40.6834 24.8822 41.4644 27.2274C41.8138 28.2971 41.2383 29.4697 40.1491 29.8194C39.9435 29.8811 39.7175 29.9222 39.5119 29.9222C38.6488 29.9222 37.8472 29.3668 37.5595 28.5028C37.169 27.3302 36.573 26.6719 35.4632 26.24C34.7644 25.952 33.4286 25.7874 31.9899 25.7874C30.5513 25.7874 29.2154 25.952 28.5166 26.24C27.4274 26.6719 26.8108 27.3302 26.4203 28.5028C26.1326 29.3668 25.3311 29.9222 24.4679 29.9222C24.2624 29.9222 24.0363 29.8811 23.8308 29.8194C22.7621 29.4697 22.1661 28.2971 22.5154 27.2274H22.536Z" fill="#024588"/>
                </svg>
                <svg v-else-if="site.iconType === 'search'" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="28" cy="28" r="10" stroke="#003366" stroke-width="2.5" fill="none"/>
                  <path d="M38 38L48 48" stroke="#003366" stroke-width="2.5" stroke-linecap="round"/>
                </svg>
                <svg v-else-if="site.iconType === 'library'" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="14" y="16" width="36" height="32" rx="2" stroke="#003366" stroke-width="2.5" fill="none"/>
                  <path d="M18 20H46M18 26H46M18 32H40M18 38H40" stroke="#003366" stroke-width="2" stroke-linecap="round"/>
                  <path d="M14 16V48M50 16V48" stroke="#003366" stroke-width="2.5"/>
                </svg>
                <svg v-else width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="18" y="14" width="28" height="36" rx="2" stroke="#003366" stroke-width="2.5" fill="none"/>
                  <path d="M24 22H40M24 30H40M24 38H32" stroke="#003366" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
              <div class="site-content">
                <h3 class="site-title">{{ site.name }}</h3>
                <a :href="site.url" target="_blank" class="btn btn-secondary">
                  Ir al sitio →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="carousel-controls">
        <button 
          class="carousel-btn"
          :disabled="windowWidth <= 768 ? isAtStart : currentIndex === 0"
          @click="previousSlide"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <div class="carousel-dots">
          <span 
            v-for="(page, index) in totalPages"
            :key="index"
            :class="['dot', { active: index === currentIndex }]"
            @click="goToSlide(index)"
          ></span>
        </div>
        <button 
          class="carousel-btn"
          :disabled="windowWidth <= 768 ? isAtEnd : currentIndex >= totalPages - 1"
          @click="nextSlide"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import strapiService from '../../services/strapi'

export default {
  name: 'SitiosRecomendadosSection',
  data() {
    return {
      sites: [],
      currentIndex: 0,
      windowWidth: window.innerWidth,
      isAtStart: true,
      isAtEnd: false
    }
  },
  computed: {
    totalPages() {
      if (this.windowWidth <= 768) {
        return this.sites.length
      } else {
        // Desktop: avanza de 3 en 3, pero muestra 3.5 por vista
        const itemsPerView = 3.5
        const itemsPerSlide = 3
        const totalItems = this.sites.length
        
        if (totalItems <= itemsPerView) {
          return 1
        }
        
        // Calcular cuántos slides necesitamos si avanzamos de 3 en 3
        const remainingAfterFirst = totalItems - itemsPerView
        return Math.ceil(remainingAfterFirst / itemsPerSlide) + 1
      }
    },
    carouselTransform() {
      if (this.sites.length === 0) return 0
      
      const isMobile = this.windowWidth <= 768
      const itemsPerView = isMobile ? 1.087 : 3.5 // 1/0.92 ≈ 1.087 para mostrar solo un pequeño pedazo
      const itemsPerSlide = isMobile ? 1 : 3
      const totalItems = this.sites.length
      
      // Si estamos en el último slide, calcular el desplazamiento para mostrar el último elemento completo
      const isLastSlide = this.currentIndex >= this.totalPages - 1
      
      if (isLastSlide && totalItems > itemsPerView) {
        // Calcular el ancho total de todos los elementos
        const gapSize = isMobile ? 12 : 24
        if (isMobile) {
          // En móvil, calcular para que el último card se muestre completo
          const cardWidthPercent = 92
          const gapPercent = (gapSize / this.windowWidth) * 100
          // Calcular cuánto necesitamos desplazar para mostrar el último card completo
          const cardsBeforeLast = totalItems - 1
          const transformForLastCard = (cardWidthPercent * cardsBeforeLast) + (gapPercent * cardsBeforeLast)
          // Ajustar para que el último card se muestre completo (no demasiado a la izquierda)
          return Math.max(0, transformForLastCard - 2)
        } else {
          // En desktop, calcular para que el último card se muestre completo
          const cardWidthPercent = 100 / itemsPerView
          const gapPercent = (gapSize / this.windowWidth) * 100
          // Ajustar para que el último card se muestre completo, considerando que mostramos 3.5 cards
          // Si hay menos de 3.5 cards, no necesitamos desplazar
          if (totalItems <= itemsPerView) {
            return 0
          }
          // Calcular el ancho total del contenido
          const totalContentWidthPercent = (cardWidthPercent * totalItems) + (gapPercent * (totalItems - 1))
          // El transform máximo es el ancho total menos 100% (el viewport)
          const maxTransform = Math.max(0, totalContentWidthPercent - 100)
          return maxTransform
        }
      }
      
      // Para slides normales
      if (isMobile) {
        // En mobile: cada slide avanza el ancho de 1 card (92%) más el gap (12px)
        const cardWidthPercent = 92
        const gapSize = 12
        const gapPercent = (gapSize / this.windowWidth) * 100
        const slideMove = cardWidthPercent + gapPercent
        return this.currentIndex * slideMove
      } else {
        // En desktop: cada slide avanza de 3 elementos completos
        // Cada card ocupa aproximadamente: (100% - 48px) / 3.5
        // Para avanzar 3 elementos, necesitamos el ancho de 3 cards + 2 gaps (entre las 3 cards)
        const cardWidthPercent = 100 / itemsPerView
        const gapSize = 24
        const gapPercent = (gapSize / this.windowWidth) * 100
        // Avanzar de 3 elementos por slide: 3 cards + 2 gaps
        const slideMove = (cardWidthPercent * itemsPerSlide) + (gapPercent * (itemsPerSlide - 1))
        return this.currentIndex * slideMove
      }
    }
  },
  async mounted() {
    await this.loadSites()
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
    this.$nextTick(() => {
      if (this.$refs.carouselWrapper && this.windowWidth <= 768) {
        this.$refs.carouselWrapper.addEventListener('scroll', this.handleScroll)
        this.updateScrollButtons()
      }
    })
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
    if (this.$refs.carouselWrapper) {
      this.$refs.carouselWrapper.removeEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    async loadSites() {
      try {
        const response = await strapiService.getCollection('sitios-recomendados', {
          populate: '*',
          sort: 'orden:asc'
        })
        this.sites = response.data || []
      } catch (error) {
        console.error('Error loading sites:', error)
        // Datos de ejemplo
        this.sites = [
          {
            id: 1,
            name: 'Revistas Académicas (Proquest)',
            url: 'https://www.proquest.com',
            iconType: 'book'
          },
          {
            id: 2,
            name: 'Portal de Revistas Académicas Chilenas',
            url: '#',
            iconType: 'document'
          },
          {
            id: 3,
            name: 'Biblioteca del Congreso',
            url: '#',
            iconType: 'people'
          },
          {
            id: 4,
            name: 'Recurso adicional',
            url: '#',
            iconType: 'library'
          },
          {
            id: 5,
            name: 'Google Académico',
            url: 'https://scholar.google.com',
            iconType: 'search'
          },
          {
            id: 6,
            name: 'Biblioteca Nacional Digital',
            url: '#',
            iconType: 'library'
          }
        ]
      }
    },
    previousSlide() {
      if (this.windowWidth <= 768) {
        // En mobile, usar scroll nativo
        this.scrollLeft()
      } else {
        // En desktop, usar el sistema de índices
        if (this.currentIndex > 0) {
          this.currentIndex--
        }
      }
    },
    nextSlide() {
      if (this.windowWidth <= 768) {
        // En mobile, usar scroll nativo
        this.scrollRight()
      } else {
        // En desktop, usar el sistema de índices
        if (this.currentIndex < this.totalPages - 1) {
          this.currentIndex++
        }
      }
    },
    goToSlide(index) {
      this.currentIndex = index
    },
    scrollLeft() {
      if (this.$refs.carouselWrapper) {
        const card = this.$refs.carouselWrapper.querySelector('.site-card')
        if (card) {
          const cardWidth = card.offsetWidth
          const gap = 16
          const scrollAmount = cardWidth + gap
          this.$refs.carouselWrapper.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
          })
        }
      }
    },
    scrollRight() {
      if (this.$refs.carouselWrapper) {
        const card = this.$refs.carouselWrapper.querySelector('.site-card')
        if (card) {
          const cardWidth = card.offsetWidth
          const gap = 16
          const scrollAmount = cardWidth + gap
          this.$refs.carouselWrapper.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
          })
        }
      }
    },
    handleScroll() {
      this.updateScrollButtons()
    },
    updateScrollButtons() {
      if (this.$refs.carouselWrapper && this.windowWidth <= 768) {
        const container = this.$refs.carouselWrapper
        const scrollLeft = container.scrollLeft
        const scrollWidth = container.scrollWidth
        const clientWidth = container.clientWidth
        
        this.isAtStart = scrollLeft <= 0
        this.isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1
      }
    },
    handleResize() {
      this.windowWidth = window.innerWidth
      this.$nextTick(() => {
        if (this.$refs.carouselWrapper && this.windowWidth <= 768) {
          this.$refs.carouselWrapper.addEventListener('scroll', this.handleScroll)
          this.updateScrollButtons()
        }
      })
    }
  }
}
</script>

<style scoped>
.sitios-section {
  padding: 60px 0;
  background: var(--white);
}

.section-title {
  text-align: center;
  font-size: 36px;
  color: var(--primary-blue);
  margin-bottom: 16px;
}

.section-subtitle {
  text-align: center;
  color: var(--text-light);
  font-size: 18px;
  margin-bottom: 40px;
}

.sites-carousel {
  overflow: visible;
  margin-bottom: 30px;
  position: relative;
}

.carousel-wrapper {
  overflow: hidden;
  width: 100%;
  padding-right: 0;
}

.carousel-container {
  display: flex;
  transition: transform 0.5s ease;
  gap: 24px;
}

.site-card {
  width: calc((100% - 48px) / 3.5);
  min-width: calc((100% - 48px) / 3.5);
  flex-shrink: 0;
  background: var(--white);
  border-radius: 8px;
  padding: 24px;
  border: 2px solid var(--border-gray);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}

.site-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.site-icon {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.site-icon svg {
  width: 100%;
  height: 100%;
}

.site-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;
}

.site-title {
  font-size: 18px;
  color: var(--primary-blue);
  font-weight: 600;
  margin: 0;
  line-height: 1.4;
}

.carousel-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.carousel-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--border-gray);
  background: var(--white);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  color: var(--text-light);
  padding: 0;
}

.carousel-btn:hover:not(:disabled),
.carousel-btn:active:not(:disabled) {
  background: var(--primary-blue);
  color: var(--white);
  border-color: var(--primary-blue);
}

.carousel-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.carousel-dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--border-gray);
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  background: var(--primary-blue);
  width: 12px;
  height: 12px;
}

@media (max-width: 968px) {
  .site-card {
    min-width: calc(50% - 12px);
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 30px;
    text-align: left;
    line-height: 1.2;
  }
  
  .section-subtitle {
    font-size: 16px;
    text-align: left;
  }
  
  .carousel-wrapper {
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    padding-right: 20px;
  }
  
  .carousel-wrapper::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .carousel-container {
    gap: 16px;
    transform: none !important;
  }
  
  .site-card {
    width: 85%;
    min-width: 85%;
    scroll-snap-align: start;
    border: 2px solid var(--border-gray);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .carousel-dots {
    display: none;
  }
  
  .carousel-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    margin-top: 24px;
  }
}
</style>

