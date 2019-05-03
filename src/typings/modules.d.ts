declare module '*'

type StyledComponentProps<T> = {
	classes: { [P in keyof T]: string }
}
