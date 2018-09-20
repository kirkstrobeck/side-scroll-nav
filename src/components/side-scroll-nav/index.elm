port module Main exposing (main)

import Array exposing (..)
import Css exposing (..)
import Html
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css, href, src)
import Html.Styled.Events exposing (onClick)


main : Program Model Model Update
main =
    Html.programWithFlags
        { init = init
        , view = view >> toUnstyled
        , update = update
        , subscriptions = subscriptions
        }


type alias Nav =
    { title : String
    , anchor : String
    }


type alias Model =
    { contents : List Nav }


init : Model -> ( Model, Cmd Update )
init state =
    ( state, Cmd.none )


type Update
    = Update Model


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
        Update state ->
            ( state, Cmd.none )


port state : (Model -> action) -> Sub action


subscriptions : Model -> Sub Update
subscriptions model =
    Sub.batch
        [ state Update ]


view : Model -> Html Update
view { contents } =
    div
        [ css
            [ height (px 50)
            , position fixed
            , width (pct 100)
            , displayFlex
            , alignItems center
            , backgroundColor theme.grey
            , overflowX scroll
            , property
                "-webkit-overflow-scrolling"
                "touch"
            ]
        ]
        div
        []
        [ [ ul
                [ css
                    [ margin (px 0)
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
                                [ backgroundColor theme.white
                                , margin (px 0)
                                , padding2 (px 0) (px 20)
                                , lineHeight (px 40)
                                , display inlineBlock
                                , whiteSpace noWrap
                                , maxWidth (px 150)
                                , flex none
                                , borderRadius (px 40)
                                , height (px 40)
                                , overflow hidden
                                , textOverflow ellipsis
                                , marginLeft (px 5)
                                ]
                            ]
                            [ text item.title ]
                    )
                    contents
                )
          ]
        ]
