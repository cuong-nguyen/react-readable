import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Post,
  Filter,
  SortBy,
  ManagePost,
  CategoryList,
  NewCategory,
} from '../components'
import { sortPost, addPost, editPost } from '../actions'
import { getSortedPosts } from '../selectors/postSelectors'
import { SORT_BY_VOTES, SORT_BY_DATE, FILTER_TYPE } from '../constants'
import Modal from 'react-modal'
import { v4 } from 'node-uuid'

class Dashboard extends Component {
  static propTypes = {
    sortPost: PropTypes.func.isRequired,
    addPost: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
    categories: PropTypes.array,
    posts: PropTypes.array,
  }

  state = {
    postModalOpen: false,
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
    const { categories, posts, sortPost } = this.props
    const { postModalOpen } = this.state

    return (
      <div className="columns">
        {categories && (
          <div className="column is-one-quarter">
            <div className="field has-addons">
              <strong>
                <span className="tag is-warning">Categories</span>
              </strong>
            </div>
            <CategoryList categories={categories} />
            <NewCategory />
          </div>
        )}

        <div className="column">
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
        </div>
        <div className="new-post">
          <a onClick={() => this.openManagePostModal(null)}>Add a post</a>
        </div>

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
  state => ({
    categories: state.categories,
    posts: getSortedPosts(state),
    filter: state.filter,
  }),
  {
    sortPost,
    addPost,
    editPost,
  }
)(Dashboard)
