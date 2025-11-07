/**
 * Product Data
 * Centralized data for all product categories and products
 */

export const productCategories = [
  {
    id: 'underwater',
    title: 'Underwater',
    route: '/underwater',
    description: 'Explore the depths with our advanced underwater robotics',
    products: [
      {
        id: 'alpha',
        title: 'Alpha',
        imageUrl: '/Underwater/Alpha-1536x864.png',
        videoUrl: '/home.mp4',
        description: 'Advanced underwater exploration platform'
      },
      {
        id: 'rov',
        title: 'ROV',
        imageUrl: '/Underwater/ROV-1536x864.png',
        videoUrl: '/home.mp4',
        description: 'Remotely Operated Vehicle for deep sea operations'
      },
      {
        id: 'luna',
        title: 'Luna',
        imageUrl: '/Underwater/Luna-1536x864.png',
        videoUrl: '/home.mp4',
        description: 'Compact autonomous underwater vehicle'
      },
      {
        id: 'arvi',
        title: 'ARVi',
        imageUrl: '/Underwater/ARVi-2023-version-web-materials-e1691747311126-1536x855.png',
        videoUrl: '/home.mp4',
        description: 'Advanced Research Vehicle for underwater inspection'
      },
      {
        id: 'boxfish-auv',
        title: 'Boxfish AUV',
        imageUrl: '/Underwater/Boxfsih-AUV-4K-camera-head-left-1536x1152.png',
        videoUrl: '/home.mp4',
        description: 'Autonomous Underwater Vehicle with 4K camera'
      }
    ]
  },
  {
    id: 'surfacewater',
    title: 'Surface Water',
    route: '/surfacewater',
    description: 'Navigate surface waters with precision and efficiency',
    products: [
      {
        id: 'apache4-usv',
        title: 'APACHE4 USV',
        imageUrl: '/Surfacewater/APACHE4-USV-for-ADCP-surveys-1-e1648122399229.png',
        videoUrl: '/home.mp4',
        description: 'Unmanned Surface Vehicle for ADCP surveys'
      },
      {
        id: 'mariner-x-usv',
        title: 'Mariner X USV',
        imageUrl: '/Surfacewater/the-mariner-x-usv.webp',
        videoUrl: '/home.mp4',
        description: 'Advanced surface vehicle for maritime operations'
      },
      {
        id: 'tactical-amy-usv',
        title: 'Tactical AMY USV',
        imageUrl: '/Surfacewater/Tactical-AMY-USV.webp',
        videoUrl: '/home.mp4',
        description: 'Tactical Autonomous Maritime Yacht'
      },
      {
        id: 'hound-reckless-usv',
        title: 'Hound Reckless USV',
        imageUrl: '/Surfacewater/Hound-Reckless-usv.webp',
        videoUrl: '/home.mp4',
        description: 'High-performance unmanned surface vehicle'
      }
    ]
  },
  {
    id: 'land',
    title: 'Land',
    route: '/land',
    description: 'Ground-based robotic solutions for all terrains',
    products: [
      {
        id: 'husky-a300',
        title: 'Husky A300',
        imageUrl: '/Land/HuskyA300_Menu_Image.png',
        videoUrl: '/home.mp4',
        description: 'All-terrain robotic platform'
      },
      {
        id: 'warthog',
        title: 'Warthog',
        imageUrl: '/Land/warthog-menu.jpg',
        videoUrl: '/home.mp4',
        description: 'Heavy-duty ground vehicle'
      },
      {
        id: 'dingo',
        title: 'Dingo',
        imageUrl: '/Land/dingo-menu-1.png',
        videoUrl: '/home.mp4',
        description: 'Compact and agile land robot'
      },
      {
        id: 'jackal',
        title: 'Jackal',
        imageUrl: '/Land/jackal.jpg',
        videoUrl: '/home.mp4',
        description: 'Fast reconnaissance vehicle'
      }
    ]
  },
  {
    id: 'air',
    title: 'Air',
    route: '/air',
    description: 'Take to the skies with our aerial platforms',
    products: [
      {
        id: 'aerial-platform-1',
        title: 'Aerial Platform 1',
        imageUrl: '/Air/6e82e273e1d05044bc6f02a278df51eb.png',
        videoUrl: '/home.mp4',
        description: 'Advanced aerial surveillance platform'
      },
      {
        id: 'aerial-platform-2',
        title: 'Aerial Platform 2',
        imageUrl: '/Air/133dbcbded142391e8ed57d0fcd57ac8.png',
        videoUrl: '/home.mp4',
        description: 'High-performance aerial vehicle'
      },
      {
        id: 'aerial-platform-3',
        title: 'Aerial Platform 3',
        imageUrl: '/Air/ae5d8b9987be8d5ecdeb5d502a1e887c.png',
        videoUrl: '/home.mp4',
        description: 'Professional drone platform'
      },
      {
        id: 'aerial-platform-4',
        title: 'Aerial Platform 4',
        imageUrl: '/Air/979ab68fd602bd3440fc4fb12f3ea38e.png',
        videoUrl: '/home.mp4',
        description: 'Enterprise-grade aerial system'
      },
      {
        id: 'aerial-platform-5',
        title: 'Aerial Platform 5',
        imageUrl: '/Air/3be8aaab8409e1575c6363658007b517.png',
        videoUrl: '/home.mp4',
        description: 'Commercial aerial platform'
      }
    ]
  }
]

export const getAllProducts = () => {
  return productCategories.flatMap(category => 
    category.products.map(product => ({
      ...product,
      category: category.title,
      categoryId: category.id,
      categoryRoute: category.route
    }))
  )
}

export const getCategoryById = (id) => {
  return productCategories.find(cat => cat.id === id)
}

export const getProductById = (categoryId, productId) => {
  const category = getCategoryById(categoryId)
  if (!category) return null
  return category.products.find(prod => prod.id === productId)
}

