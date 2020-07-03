import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css';
import styled from 'styled-components';

const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px;    
`

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [
                {id: 1, label: 'Going to leact React', important: true,  like: false},
                {id: 2, label: 'That is good',         important: false, like: false},
                {id: 3, label: 'I need a break',       important: false, like: false}
            ],
            term: '',
            filter: 'all'
        };

        this.delItem = this.delItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLike = this.onToggleLike.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);

        this.maxId = 4;
    }

    delItem(id){
        this.setState(({data}) => {
            return {
                data: [...data.slice(0,data.findIndex(elem => elem.id === id)), ...data.slice(data.findIndex(elem => elem.id === id)+1)]
            }
        });
    }

    addItem(body){
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        }
        this.setState(({data})=>{
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    onToggleImportant(id){
        this.setState(({data})=>{
            return { 
                data: [
                    ...data.slice(0,data.findIndex(elem => elem.id === id)),
                    {
                        ...data[data.findIndex(elem => elem.id === id)], 
                        important: !data[data.findIndex(elem => elem.id === id)].important
                    },
                    ...data.slice(data.findIndex(elem => elem.id === id)+1)
                ]
            }
        })
    }
    onToggleLike(id){
        this.setState(({data})=>{
            return { 
                data: [
                    ...data.slice(0,data.findIndex(elem => elem.id === id)),
                    {
                        ...data[data.findIndex(elem => elem.id === id)], 
                        like: !data[data.findIndex(elem => elem.id === id)].like
                    },
                    ...data.slice(data.findIndex(elem => elem.id === id)+1)
                ]
            }
        })
    }

    searchPost(items, term){
        if (term.length === 0) {
            return items
        }

        return items.filter( (item) => {
            return item.label.indexOf(term) > -1
        });
    }

    onUpdateSearch(term){
        this.setState({term})
    }

    onFilterSelect(filter){
        this.setState({filter})
    }

    filterPost(items, filter){
        if (filter === 'like') {
            return items.filter(item => item.like)
        } else {
            return items
        }
    }

    render() {
        const {data, term, filter} = this.state;
        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return (
            <AppBlock>
                <AppHeader
                    liked={liked}
                    allPosts={allPosts}/>
                <div className="search-panel d-flex">
                    <SearchPanel
                    onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}/>
                </div>
                <PostList 
                    posts={visiblePosts}
                    onDelete={this.delItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLike={this.onToggleLike}/>
                <PostAddForm
                    onAdd={this.addItem}/>
            </AppBlock>
        )
    }
    
}
