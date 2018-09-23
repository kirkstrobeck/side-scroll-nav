port module Main exposing (main)

-- import Dom exposing (..)

import Css exposing (..)
import Dom.Scroll exposing (toTop)
import Html exposing (programWithFlags)
import Html.Styled exposing (Html, a, div, li, text, toUnstyled, ul)
import Html.Styled.Attributes exposing (attribute, class, css, href, id, src)
import Html.Styled.Events exposing (onClick)


main : Program Model Model Msg
main =
    Html.programWithFlags
        { init = init
        , view = view >> toUnstyled
        , update = update
        , subscriptions = subscriptions
        }


type alias Nav =
    { title : String
    , id : String
    }


type alias Model =
    { contents : List Nav
    , containerClassName : String
    , wrapperId : String
    }


init : Model -> ( Model, Cmd Msg )
init state =
    ( state, Cmd.none )


type alias ElmToReactMsg =
    { command : String
    , payload : String
    }


type Msg
    = ReactUpdate Model
    | Foo ElmToReactMsg


theme :
    { grey : Color
    , white : Color
    , red : Color
    }
theme =
    { grey = hex "f5f5f5"
    , white = hex "ffffff"
    , red = hex "ff0000"
    }


update msg model =
    case msg of
        ReactUpdate model ->
            ( model, Cmd.none )

        Foo obj ->
            ( model, elmToReact obj )


port reactToElm : (Model -> action) -> Sub action


port elmToReact : ElmToReactMsg -> Cmd a


subscriptions : Model -> Sub Msg
subscriptions model =
    reactToElm ReactUpdate


view : Model -> Html Msg
view { contents, containerClassName, wrapperId } =
    div
        [ css
            [ height (px 60)
            , position fixed
            , top (px 0)
            , width (pct 100)

            -- , property "backface-visibility" "hidden"
            -- , transform (translate3d zero zero zero)
            , before
                [ property "content" "''"
                , height (px 50)
                , backgroundColor theme.grey
                , display block
                , width (pct 100)
                , position absolute
                , top (px 0)
                , zIndex (int -1)
                ]
            ]
        , id wrapperId
        ]
        [ div
            [ class containerClassName
            , attribute "data-anchor" ""
            ]
            [ div [] [] ]
        , div
            [ class containerClassName
            , attribute "data-scroller" ""
            , css
                [ overflowX scroll
                , height (px 60)
                , property
                    "-webkit-overflow-scrolling"
                    "touch"
                ]
            ]
            [ ul
                [ css
                    [ margin4 (px 5) (px 0) (px 0) (px 0)
                    , padding (px 0)
                    , listStyleType none
                    , display inlineBlock
                    , lineHeight (px 40)
                    , height (px 40)
                    , whiteSpace noWrap
                    , verticalAlign middle
                    ]
                ]
                (List.map
                    (\item ->
                        li
                            [ css
                                [ margin (px 0)
                                , display inlineBlock
                                , marginLeft (px 5)
                                , firstChild
                                    [ marginLeft (px 0) ]
                                ]
                            , attribute "data-id" item.id
                            ]
                            [ a
                                [ css
                                    [ padding2 (px 0) (px 20)
                                    , cursor pointer
                                    , property "user-select" "none"
                                    , whiteSpace noWrap
                                    , borderRadius (px 40)
                                    , height (px 40)
                                    , overflow hidden
                                    , display block
                                    , textOverflow ellipsis
                                    , backgroundColor theme.white
                                    , maxWidth (px 150)
                                    ]
                                , onClick
                                    (Foo
                                        (ElmToReactMsg "scrollTo" item.id)
                                    )
                                ]
                                [ text item.title ]
                            ]
                    )
                    contents
                )
            ]
        ]
