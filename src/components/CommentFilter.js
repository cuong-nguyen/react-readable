import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Filter, SortBy } from "../components"
import { sortComment } from "../actions"
import { FILTER_TYPE, SORT_BY_DATE, SORT_BY_VOTES } from "../constants"

const CommentFilter = ({ noOfComments, sortComment }) => {
  return (
    <div className="comment-filter">
      <div className="tags has-addons">
        <span className="tag is-primary is-medium">Comment(s)</span>
        <span className="tag is-medium">{noOfComments}</span>
      </div>
      {noOfComments > 1 && (
        <Filter type={FILTER_TYPE.COMMENT}>
          <SortBy
            text="Votes"
            onClick={() => sortComment(SORT_BY_VOTES)}
            field={SORT_BY_VOTES}
          />
          <SortBy
            text="Date"
            onClick={() => sortComment(SORT_BY_DATE)}
            field={SORT_BY_DATE}
          />
        </Filter>
      )}
    </div>
  )
}

CommentFilter.propTypes = {
  noOfComments: PropTypes.number,
  sortComment: PropTypes.func.isRequired
}

export default connect(
  state => ({
    filter: state.filter
  }),
  {
    sortComment
  }
)(CommentFilter)
