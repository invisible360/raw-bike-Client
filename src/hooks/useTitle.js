const { useEffect } = require("react")

const useTitle = title => {
    useEffect(() => {
        document.title = `${title} - IT Solution`
    }, [title])
}
export default useTitle;