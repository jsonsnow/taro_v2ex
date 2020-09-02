
class ThreadList extends React.Component {
    
    render () {
        const {loading, threads} = this.props
        if (loading) {
            return <loading/>
        }
    }
}