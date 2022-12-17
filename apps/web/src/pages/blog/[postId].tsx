import { useRouter } from 'next/router'

const posts = {
  
}

const PostPage = () => {
  const router = useRouter()
  const { postId } = router.query

  console.log('postId', postId)

  return (
    <div>
      Post Page: {postId}
    </div>
  )
}

export default PostPage