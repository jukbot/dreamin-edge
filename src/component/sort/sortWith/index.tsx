import { h } from 'preact'
import { useCallback } from 'preact/hooks'

import { useStoreon } from 'storeon/preact'

import SortWithComponent from './types'
import { SortStore, SortEvent } from '../../../store/sort/types'

const SortWith: SortWithComponent = ({ children, type, value }) => {
    let { sort, dispatch } = useStoreon<SortStore, any>('sort')

    let ifActive = sort[type] === value ? '-active' : ''

    let updateSort = useCallback(() => {
        dispatch(`UPDATE_SORT_${type.toUpperCase()}`, value)
    }, [])

    return (
        <button class={`toggler ${ifActive}`} onClick={updateSort}>
            {children}
        </button>
    )
}

export default SortWith
