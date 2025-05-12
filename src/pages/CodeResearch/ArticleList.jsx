import { useNavigate } from 'react-router-dom'
import ArticleListItem from './ArticleListItem'

function ArticleList({ articleList }) {
  const navigate = useNavigate()
  function handleClick(e) {
    const targetElement = e.target.closest('[data-e-key]')
    if (targetElement) {
      console.log(targetElement, targetElement.dataset.id)
      const eKey = targetElement.dataset.eKey
      navigate(`/article/${eKey}`)
      // window.open(`/article/${eKey}`, '_blank')
    }
  }

  return (
    <div onClick={(e) => handleClick(e)}>
      {articleList.length > 0 &&
        articleList.map((item) => {
          return (
            <ArticleListItem
              key={item.id}
              articleItem={item}
              eventKey={item.id}
            />
          )
        })}
    </div>
  )
}

export default ArticleList
