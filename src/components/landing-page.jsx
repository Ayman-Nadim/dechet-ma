"use client"

import { useState, useEffect } from "react"
import {
  Recycle,
  ChevronLeft,
  ChevronRight,
  ArrowDown,
  Truck,
  ShieldCheck,
  Leaf,
  Award,
  BarChart,
  Users,
  Clock,
  ThumbsUp,
  MessageCircle,
  Menu,
  X,
} from "lucide-react"

export default function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formStatus, setFormStatus] = useState("")
  const productsPerPage = 6

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbz2sokaV3NKzlF1yjkggyZeqFIlNTASQoTd87veQUQxBsFeTX3ZlUN9EWud4he1paBl/exec",
        )

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données")
        }

        const data = await response.json()
        console.log(data)
        setProducts(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setFormStatus("loading")

    try {
      const formData = new FormData(e.target)
      const response = await fetch("https://formcarry.com/s/0mLttvOJDOy", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        setFormStatus("success")
        e.target.reset()
      } else {
        setFormStatus("error")
      }
    } catch (error) {
      setFormStatus("error")
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const filteredProducts = products

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-700">Chargement Déchets.ma ...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Erreur de chargement</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Responsive Navigation */}
      <header className="bg-gradient-to-r from-green-800 to-green-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Recycle className="h-8 w-8 mr-2" />
              <h1 className="text-3xl font-bold">Déchets.ma</h1>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-green-700 focus:outline-none"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              <a href="#accueil" className="hover:text-green-200 transition-colors font-medium">
                Accueil
              </a>
              <a href="#produits" className="hover:text-green-200 transition-colors font-medium">
                Produits
              </a>
              <a href="#services" className="hover:text-green-200 transition-colors font-medium">
                Services
              </a>
              <a href="#apropos" className="hover:text-green-200 transition-colors font-medium">
                À propos
              </a>
              <a href="#contact" className="hover:text-green-200 transition-colors font-medium">
                Contact
              </a>
            </nav>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-2">
              <div className="flex flex-col space-y-3">
                <a
                  href="#accueil"
                  className="hover:bg-green-700 px-3 py-2 rounded-md transition-colors font-medium"
                  onClick={closeMenu}
                >
                  Accueil
                </a>
                <a
                  href="#produits"
                  className="hover:bg-green-700 px-3 py-2 rounded-md transition-colors font-medium"
                  onClick={closeMenu}
                >
                  Produits
                </a>
                <a
                  href="#services"
                  className="hover:bg-green-700 px-3 py-2 rounded-md transition-colors font-medium"
                  onClick={closeMenu}
                >
                  Services
                </a>
                <a
                  href="#apropos"
                  className="hover:bg-green-700 px-3 py-2 rounded-md transition-colors font-medium"
                  onClick={closeMenu}
                >
                  À propos
                </a>
                <a
                  href="#contact"
                  className="hover:bg-green-700 px-3 py-2 rounded-md transition-colors font-medium"
                  onClick={closeMenu}
                >
                  Contact
                </a>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="accueil" className="relative bg-gradient-to-r from-green-700 to-green-500 text-white py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-700 opacity-70"></div>
        </div>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Valorisez vos déchets avec <span className="text-green-200">Déchets.ma</span>
            </h2>
            <p className="text-xl mb-8 text-green-50">
              Plateforme leader de commercialisation des déchets recyclables au Maroc. Donnez une seconde vie à vos
              matériaux et contribuez à un avenir plus durable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#produits"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-green-700 rounded-full font-semibold hover:bg-green-100 transition-colors shadow-lg"
              >
                Découvrir nos produits
                <ArrowDown className="ml-2 h-5 w-5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-green-700 transition-colors"
              >
                Nous contacter
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://www.divonnelesbains.fr/uploads/Image/72/96679_868_Gstion-dechets.jpg"
              alt="Recyclage"
              className="rounded-lg shadow-2xl max-w-full h-auto transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="container mx-auto px-4 mt-16 relative z-10">
          <div className="bg-white rounded-xl shadow-xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Produits recyclés</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">1000+</div>
              <div className="text-gray-600">Clients satisfaits</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">15+</div>
              <div className="text-gray-600">Villes desservies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">5000+</div>
              <div className="text-gray-600">Tonnes recyclées</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-3">
              Nos avantages
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Pourquoi choisir Déchets.ma?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous offrons des solutions complètes pour la gestion et la valorisation de vos déchets recyclables.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-green-100 p-4 rounded-full inline-flex mb-6 mx-auto">
                <Leaf className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Écologique</h3>
              <p className="text-gray-600">
                Contribuez à la réduction des déchets et à préservation de notre environnement pour les générations
                futures.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-green-100 p-4 rounded-full inline-flex mb-6 mx-auto">
                <Truck className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Livraison rapide</h3>
              <p className="text-gray-600">
                Service de livraison efficace partout au Maroc pour tous vos matériaux recyclables avec suivi en temps
                réel.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-green-100 p-4 rounded-full inline-flex mb-6 mx-auto">
                <ShieldCheck className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Qualité garantie</h3>
              <p className="text-gray-600">
                Tous nos produits sont vérifiés et répondent aux normes de qualité les plus strictes pour votre
                satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="produits" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-3">
              Catalogue
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Nos Produits Recyclables</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez notre sélection de matériaux recyclables de haute qualité, triés et prêts à être transformés.
            </p>
          </div>

          {/* Products Grid */}
          {currentProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Aucun produit disponible pour le moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProducts.map((product, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300"
                >
                  <div className="h-56 overflow-hidden relative group">
                    {product.Image ? (
                      <img
                        src={product.Image || "/placeholder.svg"}
                        alt={product.Titre}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src =
                            "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                        }}
                      />
                    ) : (
                      <img
                        src="https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                        alt="Image par défaut"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                    {product.Grammage && (
                      <span className="absolute top-4 right-4 bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                        {product.Grammage} KG
                      </span>
                    )}
                    {product.Reference && (
                      <small className="absolute top-4 left-4 bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                        Ref : {product.Reference}
                      </small>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">{product.Titre}</h3>
                    <p className="text-gray-400 mb-4 line-clamp-2">Type : {product.Type}</p>
                    {product.Type && (
                      <p className="text-gray-400 mb-4 line-clamp-2">
                        Ref : {product.Type}
                      </p>
                    )}
                    <p className="text-gray-600 mb-4 line-clamp-2">{product.Description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-green-600">{product.Prix} Dh/kg</span>
                      <a href="#contact" className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md">
                        Plus d'infos
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-md ${
                    currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-green-600 hover:bg-green-100"
                  }`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1
                  // Afficher seulement quelques pages pour éviter l'encombrement
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={index}
                        onClick={() => paginate(pageNumber)}
                        className={`px-4 py-2 rounded-md ${
                          currentPage === pageNumber ? "bg-green-600 text-white" : "text-green-600 hover:bg-green-100"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    )
                  } else if (
                    (pageNumber === currentPage - 2 && currentPage > 3) ||
                    (pageNumber === currentPage + 2 && currentPage < totalPages - 2)
                  ) {
                    return (
                      <span key={index} className="px-2">
                        ...
                      </span>
                    )
                  }
                  return null
                })}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-md ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-green-600 hover:bg-green-100"
                  }`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-3">
              Nos services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Solutions complètes de recyclage</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous offrons une gamme complète de services pour répondre à tous vos besoins en matière de gestion des
              déchets.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-green-100 p-3 rounded-full inline-flex mb-4 w-14 h-14 items-center justify-center">
                <Truck className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Collecte de déchets</h3>
              <p className="text-gray-600 mb-4">
                Service de collecte professionnel pour tous types de déchets recyclables, adapté à vos besoins.
              </p>
              <a href="#" className="text-green-600 font-medium hover:text-green-700">
                En savoir plus →
              </a>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-green-100 p-3 rounded-full inline-flex mb-4 w-14 h-14 items-center justify-center">
                <BarChart className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Conseil environnemental</h3>
              <p className="text-gray-600 mb-4">
                Expertise et conseils pour optimiser votre gestion des déchets et réduire votre empreinte écologique.
              </p>
              <a href="#" className="text-green-600 font-medium hover:text-green-700">
                En savoir plus →
              </a>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-green-100 p-3 rounded-full inline-flex mb-4 w-14 h-14 items-center justify-center">
                <Users className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Formation</h3>
              <p className="text-gray-600 mb-4">
                Programmes de formation sur les meilleures pratiques de recyclage pour entreprises et collectivités.
              </p>
              <a href="#" className="text-green-600 font-medium hover:text-green-700">
                En savoir plus →
              </a>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-green-100 p-3 rounded-full inline-flex mb-4 w-14 h-14 items-center justify-center">
                <Award className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Certification</h3>
              <p className="text-gray-600 mb-4">
                Obtention de certifications environnementales reconnues pour valoriser vos efforts écologiques.
              </p>
              <a href="#" className="text-green-600 font-medium hover:text-green-700">
                En savoir plus →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-3">
              Témoignages
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Ce que disent nos clients</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les expériences de ceux qui ont choisi Déchets.ma pour leurs besoins en recyclage.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6 italic">
                "Déchets.ma a transformé notre approche du recyclage. Leur service est professionnel, efficace et a
                considérablement réduit nos coûts de gestion des déchets."
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                  alt="Client"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">Ahmed Benani</h4>
                  <p className="text-gray-500 text-sm">Directeur, EcoSolutions Maroc</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6 italic">
                "La qualité des matériaux recyclés que nous avons achetés chez Déchets.ma est exceptionnelle. Leur
                engagement envers l'environnement est vraiment inspirant."
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                  alt="Client"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">Fatima Zahra</h4>
                  <p className="text-gray-500 text-sm">Responsable Achats, GreenTech</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6 italic">
                "Le service client de Déchets.ma est exceptionnel. Ils ont répondu à toutes nos questions et nous ont
                guidés tout au long du processus de recyclage de nos déchets industriels."
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                  alt="Client"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">Karim Tazi</h4>
                  <p className="text-gray-500 text-sm">PDG, Industrie Moderne</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-3">
              Notre processus
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Comment ça fonctionne</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un processus simple et efficace pour valoriser vos déchets recyclables.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="relative">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                  <Clock className="h-10 w-10 text-green-600" />
                </div>
                <div className="hidden md:block absolute top-10 left-full w-full h-1 bg-green-200 -z-10"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">1. Planification</h3>
              <p className="text-gray-600">Contactez-nous pour planifier la collecte de vos déchets recyclables.</p>
            </div>

            <div className="text-center">
              <div className="relative">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                  <Truck className="h-10 w-10 text-green-600" />
                </div>
                <div className="hidden md:block absolute top-10 left-full w-full h-1 bg-green-200 -z-10"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">2. Collecte</h3>
              <p className="text-gray-600">Nos équipes professionnelles collectent vos déchets à l'adresse indiquée.</p>
            </div>

            <div className="text-center">
              <div className="relative">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                  <Recycle className="h-10 w-10 text-green-600" />
                </div>
                <div className="hidden md:block absolute top-10 left-full w-full h-1 bg-green-200 -z-10"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">3. Traitement</h3>
              <p className="text-gray-600">Nous trions, nettoyons et préparons les matériaux pour le recyclage.</p>
            </div>

            <div className="text-center">
              <div className="relative">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                  <ThumbsUp className="h-10 w-10 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">4. Valorisation</h3>
              <p className="text-gray-600">
                Les matériaux sont transformés en nouveaux produits ou vendus à des recycleurs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="apropos" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img
                src="https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="À propos de Déchets.ma"
                className="rounded-xl shadow-xl max-w-full h-auto"
              />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-3">
                Notre histoire
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">À propos de Déchets.ma</h2>
              <p className="text-gray-600 mb-4 text-lg">
                Déchets.ma est la première plateforme marocaine dédiée à la commercialisation des déchets recyclables.
                Notre mission est de faciliter la valorisation des déchets en créant un marché transparent et
                accessible.
              </p>
              <p className="text-gray-600 mb-4 text-lg">
                Fondée en 2023, notre entreprise s'engage à promouvoir l'économie circulaire et à contribuer à la
                réduction de l'empreinte écologique du Maroc.
              </p>
              <p className="text-gray-600 mb-8 text-lg">
                Nous travaillons avec un réseau de collecteurs, de recycleurs et d'industriels pour offrir une large
                gamme de matériaux recyclables de qualité.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                  <div className="text-3xl font-bold text-green-600">500+</div>
                  <div className="text-gray-600">Produits</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                  <div className="text-3xl font-bold text-green-600">1000+</div>
                  <div className="text-gray-600">Clients</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                  <div className="text-3xl font-bold text-green-600">15+</div>
                  <div className="text-gray-600">Villes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-green-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à valoriser vos déchets?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Rejoignez notre réseau de partenaires et contribuez à un avenir plus durable tout en valorisant vos déchets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-green-700 rounded-full font-semibold hover:bg-green-100 transition-colors shadow-lg"
            >
              Contactez-nous
            </a>
            <a
              href="#produits"
              className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-green-700 transition-colors"
            >
              Voir nos produits
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-3">
              Contact
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Contactez-nous</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous sommes là pour répondre à toutes vos questions et vous aider dans votre démarche de recyclage.
            </p>
          </div>

          <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/5 bg-gradient-to-br from-green-700 to-green-500 text-white p-8">
                <h3 className="text-2xl font-semibold mb-6">Informations de contact</h3>
                <p className="mb-8">N'hésitez pas à nous contacter pour toute question ou demande d'information.</p>

                <div className="mb-6">
                  <h4 className="font-semibold mb-2 text-lg">Adresse</h4>
                  <p className="text-green-50">Ain ChocK , Casablanca, Maroc</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-2 text-lg">Téléphone</h4>
                  <p className="text-green-50">+212 6 68 31 16 68</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-2 text-lg">Email</h4>
                  <p className="text-green-50">contact@Déchets.ma</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-lg">Horaires</h4>
                  <p className="text-green-50">Lun-Ven: 9h-18h</p>
                </div>
              </div>

              <div className="md:w-3/5 p-8">
                <h3 className="text-2xl font-semibold mb-6 text-gray-800">Envoyez-nous un message</h3>

                <form
                  action="https://formcarry.com/s/0mLttvOJDOy"
                  method="POST"
                  className="space-y-6"
                  onSubmit={handleFormSubmit}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Votre nom"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Sujet de votre message"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Votre message..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md font-semibold"
                    disabled={formStatus === "loading"}
                  >
                    {formStatus === "loading" ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Envoi en cours...
                      </span>
                    ) : (
                      "Envoyer"
                    )}
                  </button>

                  {formStatus === "success" && (
                    <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
                      Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
                    </div>
                  )}

                  {formStatus === "error" && (
                    <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                      Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer ultérieurement.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Simplified */}
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Recycle className="h-6 w-6 mr-2 text-green-600" />
              <h3 className="text-xl font-bold text-gray-800">Déchets.ma</h3>
            </div>

            <div className="flex space-x-4 mb-4 md:mb-0">
              <a href="#" className="bg-green-600 p-2 rounded-full text-white hover:bg-green-700 transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="bg-green-600 p-2 rounded-full text-white hover:bg-green-700 transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="bg-green-600 p-2 rounded-full text-white hover:bg-green-700 transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-gray-600">&copy; {new Date().getFullYear()} Déchets.ma. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/212668311668"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed left-6 mb-40 bottom-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center"
        aria-label="Contactez-nous sur WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="ml-2 hidden md:inline">WhatsApp</span>
      </a>
    </div>
  )
}
