let baseURL
switch (import.meta.env.MODE) {
    case 'development':
        baseURL = '/api'
        break;
    case 'production':
        baseURL = 'http://localhost:4399'
        break;
    default:
        break;
}

export { baseURL }