import React, { Component } from "react"
import PropTypes from "prop-types"
import { Post, Filter, SortBy, ManagePost, GoToHome } from "../components"
import { SORT_BY_VOTES, SORT_BY_DATE, FILTER_TYPE } from "../constants"
import { connect } from "react-redux"
import { getPostsByCategory } from "../selectors/postSelectors"
import { sortPost, addPost, editPost } from "../actions"
import Modal from "react-modal"
import { v4 } from "node-uuid"

class Category extends Component {
  static propTypes = {
    addPost: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
    sortPost: PropTypes.func.isRequired,
    posts: PropTypes.array,
    categoryName: PropTypes.string.isRequired
  }

  state = {
    postModalOpen: false
  }

  openManagePostModal = post => {
    this.editingPost = post
    this.setState({ postModalOpen: true })
  }

  closeManagePostModal = () => this.setState({ postModalOpen: false })

  handleSubmitPost = post => {
    const { addPost, editPost } = this.props
    post.timestamp = new Date().getTime()

    if (post.id) {
      editPost(post)
    } else {
      post.id = v4()
      addPost(post)
    }

    this.setState({ postModalOpen: false })
  }

  render() {
    const { posts, categoryName, sortPost } = this.props
    const { postModalOpen } = this.state

    return (
      <div>
        <h1 className="title">#{categoryName}</h1>

        {posts.length > 1 && (
          <Filter type={FILTER_TYPE.POST}>
            <SortBy
              text="Votes"
              onClick={() => sortPost(SORT_BY_VOTES)}
              field={SORT_BY_VOTES}
            />
            <SortBy
              text="Date"
              onClick={() => sortPost(SORT_BY_DATE)}
              field={SORT_BY_DATE}
            />
          </Filter>
        )}

        <div className="columns is-multiline">
          {posts.map(post => (
            <div className="column is-one-third" key={post.id}>
              <Post postId={post.id} onEdit={this.openManagePostModal} />
            </div>
          ))}
        </div>

        <div className="new-post">
          <a onClick={() => this.openManagePostModal(null)}>Add a post</a>
        </div>

        <GoToHome />

        <Modal
          isOpen={postModalOpen}
          contentLabel="Modal"
          className="post-modal"
          overlayClassName="post-overlay"
          onRequestClose={this.closeManagePostModal}
        >
          <ManagePost
            post={this.editingPost}
            onSubmit={this.handleSubmitPost}
          />
        </Modal>
      </div>
    )
  }
}

export default connect(
  (state, { match }) => {
    const categoryName = match.params.categoryName

    return {
      posts: getPostsByCategory(state, categoryName),
      categoryName
    }
  },
  {
    sortPost,
    addPost,
    editPost
  }
)(Category)
