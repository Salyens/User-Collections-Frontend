const handleLogOut = (navigate) => {
  localStorage.clear();
  navigate("/main-page");
}
export default handleLogOut;
