const saveAvatar = (avatarFile: File) => {
  console.log(avatarFile)
  const reader = new FileReader();
  reader.onloadend = () => {
    const base64Avatar = reader.result as string;
    localStorage.setItem('userAvatar', base64Avatar);  // Lưu Base64 vào localStorage
    console.log(base64Avatar)
  };
  reader.readAsDataURL(avatarFile);

};

// Để lấy avatar từ localStorage
const getAvatar = () => {
  return localStorage.getItem('userAvatar');
};

const setDisplayName = (name: string) => {
  localStorage.setItem('userDisplayname', name)
}

const getDisplayName = () => {
  return localStorage.getItem('userDisplayname')
}

const setOrg = (org_id: string) => {
  return localStorage.setItem('userOrg', org_id)
}

const getOrg = () => localStorage.getItem('userOrg')

const reset = () => localStorage.clear()


export const useUser = () => {
  return { saveAvatar, getAvatar, setDisplayName, getDisplayName, setOrg, getOrg, reset }
}