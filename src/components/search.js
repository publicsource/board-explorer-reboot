import React, { Component } from 'react'
import { Link } from 'gatsby'
import _ from "lodash";

import { Search, List, Label, Icon } from 'semantic-ui-react'

class SearchAllNodes extends Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.Name })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value?.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.Name.concat(result.Acronymn))

      this.setState({
        isLoading: false,
        results: _.filter(this.props.source, isMatch),
      })
    }, 100)
  }

  render() {
    const { isLoading, value, results } = this.state
    
    const resRender = ({ Name, Acronymn, Type, Slug }) => (
      <List.Item>
        <Link to={Type === "Board" ? `/board/${Slug}` : `/person/${Slug}`}>
          <List.Header as='a'>
            {Name} {Acronymn ? `(${Acronymn})` : `` }
          </List.Header>
          {Type === 'Board' ? 
            <Label horizontal style={{ marginLeft: `6px` }}>
              {Type.toUpperCase()}
            </Label>
            : <Icon name='user' style={{ marginLeft: `5px` }} color='grey' horizontal />
          }
        </Link>
      </List.Item>
    )

    return (
      <Search
        input={{ fluid: true }}
        fluid
        placeholder="Search by name or board..."
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 100, { leading: true })}
        results={results}
        resultRenderer={resRender}
        value={value}
        {...this.props}
      />
    )
  }
}

export default SearchAllNodes